import pickle
import numpy as np
import pandas as pd


def check_fraud(time, amount):
    # loading modal
    with open('./artifacts/myfinal.pickle', 'rb') as f:
        pickle_model = pickle.load(f)
    # loading loading csv
    xTest = pd.read_csv('./artifacts/file.csv')
    pca_credit = xTest[(xTest['Time'] == time) & (xTest['Amount'] == amount)]
    if(len(pca_credit) == 0):
        return 'INVALID'
    required = np.array(pca_credit)
    testData = required[0][:-1].reshape(1,-1)
    output = pickle_model.predict(testData)
    left = required[0][-1]
    message = ''
    if(left == 1.0 and output == [-1]):
        message = 'Fraud'
    elif(left == 0.0 and output == [1]):
        message = 'Normal'
    else:
        message = 'Fraud'
    return message
