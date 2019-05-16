
from __future__ import print_function
import requests, json, time, datetime
import sys

def get_data(market, candle):
	headers = {'User-Agent': 'Mozilla/5.0'}
	url = "https://scanner.tradingview.com/crypto/scan"

	payload =	{
					"symbols": {
						"tickers": ["BINANCE:{}".format(market)],
						"query": { "types": [] }
					},
					"columns": [
						"Recommend.Other|{}".format(candle),
						"Recommend.All|{}".format(candle),
						"Recommend.MA|{}".format(candle),
						"RSI|{}".format(candle),
						"RSI[1]|{}".format(candle),
						"CCI20|{}".format(candle),
						"CCI20[1]|{}".format(candle),
						"MACD.macd|{}".format(candle),
						"MACD.signal|{}".format(candle),
						"EMA10|{}".format(candle),
						"SMA10|{}".format(candle),
						"EMA20|{}".format(candle),
						"SMA20|{}".format(candle),
						"EMA30|{}".format(candle),
						"SMA30|{}".format(candle),
						"EMA50|{}".format(candle),
						"SMA50|{}".format(candle),
						"EMA100|{}".format(candle),
						"SMA100|{}".format(candle),
						"Pivot.M.Classic.S3|{}".format(candle),
						"Pivot.M.Classic.S2|{}".format(candle),
						"Pivot.M.Classic.S1|{}".format(candle),
						"Pivot.M.Classic.Middle|{}".format(candle),
						"Pivot.M.Classic.R1|{}".format(candle),
						"Pivot.M.Classic.R2|{}".format(candle),
						"Pivot.M.Classic.R3|{}".format(candle),
						"Pivot.M.Fibonacci.S3|{}".format(candle),
						"Pivot.M.Fibonacci.S2|{}".format(candle),
						"Pivot.M.Fibonacci.S1|{}".format(candle),
						"Pivot.M.Fibonacci.Middle|{}".format(candle),
						"Pivot.M.Fibonacci.R1|{}".format(candle),
						"Pivot.M.Fibonacci.R2|{}".format(candle),
						"Pivot.M.Fibonacci.R3|{}".format(candle),
						"Pivot.M.Camarilla.S3|{}".format(candle),
						"Pivot.M.Camarilla.S2|{}".format(candle),
						"Pivot.M.Camarilla.S1|{}".format(candle),
						"Pivot.M.Camarilla.Middle|{}".format(candle),
						"Pivot.M.Camarilla.R1|{}".format(candle),
						"Pivot.M.Camarilla.R2|{}".format(candle),
						"Pivot.M.Camarilla.R3|{}".format(candle),
						"Pivot.M.Woodie.S3|{}".format(candle),
						"Pivot.M.Woodie.S2|{}".format(candle),
						"Pivot.M.Woodie.S1|{}".format(candle),
						"Pivot.M.Woodie.Middle|{}".format(candle),
						"Pivot.M.Woodie.R1|{}".format(candle),
						"Pivot.M.Woodie.R2|{}".format(candle),
						"Pivot.M.Woodie.R3|{}".format(candle)
					]
				}

	resp = requests.post(url,headers=headers,data=json.dumps(payload)).json()
	
	rec_other = ""
	rec_all = ""
	rec_ma = ""
	rec_list = [rec_other, rec_all, rec_ma]
	
	for i in range(3):
		signal = round(resp["data"][0]["d"][i],3)
		if signal>0.5:
			rec_list[i] += "STRONG BUY"
		elif signal>0:
			rec_list[i] += "BUY"
		elif signal==0:
			rec_list[i] += "NEUTRAL"
		elif signal>-0.5:
			rec_list[i] += "SELL"
		else:
			rec_list[i] += "STRONG SELL"
	
	data = {
	        "recommended": {
	                "Oscillators": rec_list[0],
	                "Summary": rec_list[1],
	                "Moving Averages": rec_list[2]
	        },
	        "s_moving_averages": {
	                "SMA10": resp["data"][0]["d"][10],
	                "SMA20": resp["data"][0]["d"][12],
	                "SMA30": resp["data"][0]["d"][14],
	                "SMA50": resp["data"][0]["d"][16],
	                "SMA100": resp["data"][0]["d"][18]              
	        },
	        "e_moving_averages": {
	                "EMA10": resp["data"][0]["d"][9],
	                "EMA20": resp["data"][0]["d"][11],
	                "EMA30": resp["data"][0]["d"][13],
	                "EMA50": resp["data"][0]["d"][15],
	                "EMA100": resp["data"][0]["d"][17]
	        },	        
	        "oscillators": {
	                "Relative Strength Index (14)": resp["data"][0]["d"][3],
	                "MA Convergence / Divergence": resp["data"][0]["d"][7],
	                "Commodity Channel Index (20)": resp["data"][0]["d"][5]
	        },
			"pivots":{
					"Support 3":{
						"Classic": resp["data"][0]["d"][19],
						"Fibonacci": resp["data"][0]["d"][26],
						"Camarilla": resp["data"][0]["d"][33],
						"Woodie": resp["data"][0]["d"][40],
					},
					"Support 2":{
						"Classic": resp["data"][0]["d"][20],
						"Fibonacci": resp["data"][0]["d"][27],
						"Camarilla": resp["data"][0]["d"][34],
						"Woodie": resp["data"][0]["d"][41],
					},
					"Support 1":{
						"Classic": resp["data"][0]["d"][21],
						"Fibonacci": resp["data"][0]["d"][28],
						"Camarilla": resp["data"][0]["d"][35],
						"Woodie": resp["data"][0]["d"][42],
					},
					"Pivot":{
						"Classic": resp["data"][0]["d"][22],
						"Fibonacci": resp["data"][0]["d"][29],
						"Camarilla": resp["data"][0]["d"][36],
						"Woodie": resp["data"][0]["d"][43],
					},
					"Resistance 1":{
						"Classic": resp["data"][0]["d"][23],
						"Fibonacci": resp["data"][0]["d"][30],
						"Camarilla": resp["data"][0]["d"][37],
						"Woodie": resp["data"][0]["d"][44],
					},
					"Resistance 2":{
						"Classic": resp["data"][0]["d"][24],
						"Fibonacci": resp["data"][0]["d"][31],
						"Camarilla": resp["data"][0]["d"][38],
						"Woodie": resp["data"][0]["d"][45],
					},
					"Resistance 3":{
						"Classic": resp["data"][0]["d"][25],
						"Fibonacci": resp["data"][0]["d"][32],
						"Camarilla": resp["data"][0]["d"][39],
						"Woodie": resp["data"][0]["d"][46],
					}
			}
	        }
	
	json_data = json.dumps(data)	
	
	print(str(json_data))
	
	return json_data

if __name__ == "__main__":
	retval = get_data("BTCUSDT", 60)
