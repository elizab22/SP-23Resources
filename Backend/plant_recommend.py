import numpy as np
import pandas as pd
from csv import writer
import random

global region


def filter_region(region):
    return df.loc[df['Region'] == region]

def make_dicts(df):
    dict_list = []
    for filter in ['Sun Exposure', 'Color', 'Blooming Period', 'Fruit Characteristics', 'Type', 'Size']:
        temp_dict = dict()
        count = 0
        while count < len(df):
            info = (df.iloc[count])[filter]
            key = info.lower()
            if filter != 'Fruit Characteristics' and info != 'set()':  
                info = ((df.iloc[count])[filter])[1: -1].split(", ")
            for i in info:
                if filter != 'Fruit Characteristics' and info != 'set()':
                    key = i[1:-1]
                if temp_dict.get(key):
                    temp_dict.get(key).add(count)
                else:
                    dict_set = set()
                    dict_set.add(count)
                    temp_dict.update({key: dict_set})
            count += 1
        dict_list.append(temp_dict)
    return dict_list

def make_dicts_ml(df):
    dict_list = []
    for filter in ['Sun Exposure', 'Color', 'Blooming Period', 'Fruit Characteristics', 'Type', 'Size']:
        index_list = [0, 2, 3, 5, 6]
        temp_dict = dict()
        for count in index_list:
            info = df.at[count, filter]
            key = info.lower()
            if filter != 'Fruit Characteristics' and info != 'set()':  
                info = df.at[count, filter][1: -1].split(", ")
            for i in info:
                if filter != 'Fruit Characteristics' and info != 'set()':
                    key = i[1:-1]
                if temp_dict.get(key):
                    temp_dict.get(key).add(count)
                else:
                    dict_set = set()
                    dict_set.add(count)
                    temp_dict.update({key: dict_set})
        dict_list.append(temp_dict)
    return dict_list

def get_scores(spec_arr, df, dict_list):
    df_copy = df.copy()
    df_copy['Score'] = 0
    count = 0
    weights = [.5, .3, 1, .3, 1.3, 1]
    for filter in ['Sun Exposure', 'Color', 'Blooming Period', 'Fruit Characteristics', 'Type', 'Size']:
        spec = spec_arr[count]
        good_indices = dict_list[count].get(spec)
        if (good_indices is not None):
            for i in good_indices:
                df_copy.at[i, 'Score'] += weights[count]
            count += 1
    earth_index_weight = .15
    df_copy['Score'] = df_copy['Score'] + (df_copy['Rating'] * earth_index_weight)
    max_score = 5.9
    df_copy['Percent Match'] = df_copy['Score'] / max_score * 100
    return df_copy

def construct_data(df):
    label_set = ["Pam's Pink American Honeysuckle", 'Verbena', "Giant Turk's Cap", 'Chenille Plant']
    region = 0
    df = filter_region(region)
    
    small_df = df[df['Name'] == 'Mexican Zinnia']
    for i in label_set:
        temp_df = df[df['Name'] == i]
        small_df = small_df.append(temp_df, ignore_index = True)
    small_df.drop(labels = 1, inplace=True)
    small_df.drop(labels = 4, inplace=True)
    
    possible_sun = ['sun', 'partial sun', 'shade']
    possible_colors = ['orange', 'white', 'yellow', 'pink', 'blue', 'red']
    possible_bloom = ['spring', 'fall', 'summer', 'winter']
    possible_fruit = ['FALSE', 'TRUE']
    possible_type = ['vine', 'annual', 'perennial', 'shrub', 'tropical']
    possible_size = ['small', 'medium', 'large']
    
    with open('plants_training_dataset.csv', 'a', encoding = 'utf8', newline = '') as f:
        my_writer = writer(f)
        
        header = ['Sun Exposure', 'Color', 'Blooming Period', 'Fruit?','Type', 'Size', 'Score', 'Plant', 'Good?']
        features = [possible_sun, possible_colors, possible_bloom, possible_fruit, possible_type, possible_size]
        match_dict = {"Pam's Pink American Honeysuckle":.80, 'Verbena':.95, "Giant Turk's Cap":.70, 'Chenille Plant':.20, 'Mexican Zinnia':.65}
        my_writer.writerow(header)
        for i in range(0, 5000):
            row = []
            for j in features:
                temp = random.randint(0, len(j) - 1)
                row.append(j[temp])
            dict_list = make_dicts_ml(small_df)
            temp_df = get_scores(row, small_df, dict_list)
            temp_df.sort_values('Score', inplace = True, ascending=[False])
            prediction = temp_df.head(1)
            rating = prediction['Rating'].to_string()
            row.append(rating[5:])
            name = (prediction['Name'].to_string())[5:]
            row.append(name)
            match = match_dict.get(name)
            random_val = random.random()
            row.append(random_val > match)
            
            # yes_or_no = random.random() > int()
            # count = 0
            # first_letter = 0
            # for char in prediction.split():
            #     if char.isalpha():
            #         first_letter = count
                    
            #     count += 1
            my_writer.writerow(row)
                    
            
    
    
    


        
df = pd.read_csv("pants_filtered.csv")

def init():

    dict_list_per_region = []
    df_list_per_region = []

    for i in range(0, 7):
        temp_df = filter_region(i)
        dict_list = make_dicts(temp_df)
        dict_list_per_region.append(dict_list)
        df_list_per_region.append(temp_df)
    
    # region_dict = dict_list_per_region[0]
    # region_df = df_list_per_region[0]
    return dict_list_per_region, df_list_per_region


# ['Sun Exposure', 'Color', 'Blooming Period', 'Fruit Characteristics', 'Type', 'Size']
# score = get_scores(['partial sun', 'pink', 'spring', 'false', 'perennial', 'small' ], region_df, region_dict)
# score.sort_values('Score', inplace = True, ascending = False)

# print(score.head(5))


# construct_data(df)


