import os
import pandas as pd

for filename in os.listdir("./csv"):
    with open(f"./csv/{filename}", "r+") as f:
        str = f.readline()
        f.truncate(f.tell())
        
print("All bar csv files cleared")