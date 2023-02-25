import requests
from bs4 import BeautifulSoup
from csv import writer

def scrape_inner(r_ins) :
    soup_ins = BeautifulSoup(r_ins.content, 'html.parser')
    dont_want = {' Common Name:', ' Scientific Name:', ' Exposure:', ' Family Name:'}
    for s in soup_ins.find_all('div', id = 'details_left'):
        for d in s.find_all('div', class_ = None):
            
        

all_links = ['http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_a', 
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_b',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_c',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_d',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_e',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_f',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_g',
             'http://ekps.tamu.edu/allplantsforregion?per_page=10000&region=zone_h']

r = requests.get('http://ekps.tamu.edu/details?id=189&region=zone_a')

scrape_inner(r)

counter = 0
# for link in all_links:
        
#     r = requests.get(link)

#     soup = BeautifulSoup(r.content, 'html.parser')

#     with open('plants.csv', 'a', encoding = 'utf8', newline = '') as f:
#         my_writer = writer(f)
#         header = ['Name', 'Region','Scientific Name', 'Sun Exposure', 'Rating']
#         my_writer.writerow(header)
#         for s in soup.find_all('div', class_= 'container_1'):
#             ins_link = s.find('div', class_ = 'col_2').find('a', href = True)
            
            
#             if ins_link is not None:
#                 name = s.find('div', class_ = 'col_2').text.strip()
#                 scientific_name = s.find('div', class_ = 'col_3').text.strip()
#                 sun_expos = s.find('div', class_ = 'col_4').text.strip()
#                 rating = s.find('div', class_ = 'col_5').text.strip()
                
#                 #open hyperlink for more information about plant and scrape info there
#                 r_ins = requests.get('http://ekps.tamu.edu/' + ins_link['href'])
                
                
                
                
#                 row = [name, counter, scientific_name, sun_expos, rating]
#                 my_writer.writerow(row)
#     counter += 1
    # print(r)
    # print(r.content)
    