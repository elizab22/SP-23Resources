import requests
from bs4 import BeautifulSoup
from csv import writer

def scrape_inner(r_ins) :
    data_map = {}
    soup_ins = BeautifulSoup(r_ins.content, 'html.parser')
    dont_want = {' Common Name:', ' Scientific Name:', ' Exposure:', ' Family Name:', ' USDA Hardiness Zones:', ' Earth–Kind® Index:'}
    for s in soup_ins.find_all('div', id = 'details_left'):
        for d in s.find_all('div', class_ = None):
            p = d.find('p').text
            if p not in dont_want:
                info = d.find('div', class_ = "info_div").text.strip()
                data_map.update({p.strip().replace(":", ""): info})
        #for the earth index - search through s to find the list of earth index attributes
        for l in s.find('ul', class_ = "ek_index_def_ul"):
            data_map.update({l.text.split(":")[0].strip(): l.text.split(":")[1].strip()})
    for i in soup_ins.find_all('div', id = 'details_right'):
        image = i.find('a', href = True)
        if image is not None:
            data_map.update({"image": 'http://ekps.tamu.edu/' + image['href']})
    return data_map

        

all_links = ['http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_a', 
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_b',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_c',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_d',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_e',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_f',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_g',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_h']

counter = 0
for link in all_links:
        
    r = requests.get(link)

    soup = BeautifulSoup(r.content, 'html.parser')

    with open('plants.csv', 'a', encoding = 'utf8', newline = '') as f:
        my_writer = writer(f)
        header = ['Name', 'Region','Scientific Name', 'Sun Exposure', 'Rating', 'Description', 'Habit or Use', 'Color', 'Blooming Period', 'Fruit Characteristics', 'Height', 'Width',  'Firewise Index', 'Additional Comments', 'Heat Tolerance', 'Water Requirements', 'Soil Requirements', 'Pest Tolerance', 'Fertility Requirements', 'Image', 'Type', 'Size']
        extra_vals = ['Description', 'Plant Habit or Use', 'Flower Color', 'Blooming Period', 'Fruit Characteristics', 'Height', 'Width',  'Firewise Index', 'Additional Comments', 'Heat Tolerance', 'Water Requirements', 'Soil Requirements', 'Pest Tolerance', 'Fertility Requirements', 'image']
        if counter == 0:
            my_writer.writerow(header)
        for s in soup.find_all('div', class_= 'container_1'):
            ins_link = s.find('div', class_ = 'col_2').find('a', href = True)
            
            
            if ins_link is not None:
                name = s.find('div', class_ = 'col_2').text.strip()
                scientific_name = s.find('div', class_ = 'col_3').text.strip()
                sun_expos = s.find('div', class_ = 'col_4').text.strip()
                rating = s.find('div', class_ = 'col_5').text.strip()
                if rating == "See note regarding cool season annuals":
                    rating = 10
                     
                #beautiful soup messes up the url - replacing the special character w/ what's supposed to be there
                link_str = ins_link['href'].replace("®", "&reg")
                
                #open hyperlink for more information about plant and scrape info there
                r_ins = requests.get('http://ekps.tamu.edu' + link_str)
                
                data_map = scrape_inner(r_ins)
                data = []
                for temp in extra_vals:
                    if temp in data_map.keys():
                        data.append(data_map[temp])
                    else:
                        data.append("None")
                
                
                use = data[1]
                description = data[0]
                plant_types = set()
                sizes = set()
                all_types = ['perennial', 'groundcover', 'vine', 'shrub', 'tree', 'grass', 'interiorscape', 'annual', 'tropical']
                all_sizes = ['small', 'medium', 'large']
                for type in all_types:
                    if type in use.lower() or type in description.lower():
                        plant_types.add(type)
                data.append(plant_types)
                for size in all_sizes:
                    if (size in use.lower() or size in description.lower()):
                        sizes.add(size)
                if (len(sizes) == 0):
                    sizes.add('small')
                    sizes.add('medium')
                data.append(sizes)

                row = [name, counter, scientific_name, sun_expos, rating]
                row = row + data
                my_writer.writerow(row)
    counter += 1

    