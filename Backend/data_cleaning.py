import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
import re


def height_range(height_info):
    in_feet = ("ft" in height_info)
    temp = re.findall(r'\d+', height_info)
    count = 0
    for i in temp:
        temp[count] = int(i)
        count += 1
    temp.sort()
    if len(temp) == 0:
        return [0, 20] 
    if not in_feet:
        return [temp[0] / 12, temp[-1] / 12]
    else:
        return [temp[0], temp[-1]]

def index_range(index_info):
    if "High" in index_info:
        return 2
    elif "Medium" in index_info:
        return 1
    elif "Low" in index_info:
        return 0
    else:
        return 1

def numerize_data(name):
    df = pd.read_csv(name)
    df = df.drop('Habit or Use', axis = 1)
    df = df.drop('Firewise Index', axis = 1)
    
    sun_lookup = ['sun', 'partial sun', 'shade', 'sun, partial sun', 'partial sun, shade', 'sun, shade', 'sun, partial sun, shade']
    color_lookup = ['red', 'green', 'blue', 'indigo', 'green', 'violet', 'orange', 'yellow', 'pink', 'white', 'black', 'maroon', 'brown', 'beige']
    bloom_lookup = ['spring', 'fall', 'summer', 'winter']
    count = 0
    while (count < len(df)):
        if df.at[count, 'Sun Exposure'] not in sun_lookup:
            df = df.drop(count)
        elif df.at[count, 'Height'] == ('indeterminant'):
            df = df.drop(count)
        elif df.at[count, 'Width'] == ('indeterminant'):
            df = df.drop(count)
        elif df.at[count, 'Height'] == ('indefinite'):
            df = df.drop(count)
        elif df.at[count, 'Width'] == ('indefinite'):
            df = df.drop(count)
        else:
            df.at[count, 'Sun Exposure'] = df.at[count, 'Sun Exposure'].split(", ")
            color_descrip = df.at[count, 'Color'] .lower()
            df.at[count, 'Color'] = set()
            for color in color_lookup:
                if color in color_descrip:
                    df.at[count, 'Color'].add(color)
            bloom_descrip = df.at[count, 'Blooming Period'].lower()
            df.at[count, 'Blooming Period'] = set()
            for bloom in bloom_lookup:
                if bloom in bloom_descrip:
                    df.at[count, 'Blooming Period'].add(bloom)
            df.at[count, 'Fruit Characteristics'] = ((df.at[count, 'Fruit Characteristics'].find("Not") == -1) and (df.at[count, 'Fruit Characteristics'].find("not") == -1))
            height_info = df.at[count, 'Height']
            df.at[count, 'Height'] = height_range(height_info)
            width_info = df.at[count, 'Width']
            df.at[count, 'Width'] = height_range(width_info)
            
            indices = ['Heat Tolerance', 'Water Requirements', 'Soil Requirements', 'Pest Tolerance', 'Fertility Requirements']
            for i in indices:
                index_descrip = df.at[count, i]
                df.at[count, i] = index_range(index_descrip)
        count += 1
    
    return df
    
    
    

df = numerize_data('plants.csv')
df.to_csv('plants_filtered.csv', index = False)
df['Type'] = set(df['Type'])

