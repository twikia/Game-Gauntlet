import requests
from bs4 import BeautifulSoup
import validators
import re
from urllib.parse import urlparse, urljoin
import time
from requests_html import HTMLSession
from Wappalyzer import Wappalyzer, WebPage
import warnings
import pandas as pd
import sys


def get_website_performance_metrics(url):
    
    session = HTMLSession()
    
    # Initial Load Metrics
    start_time = time.time()
    try:
        r = session.get(url, timeout=4)
        initial_load_time = time.time() - start_time
    
        r.raise_for_status()  # Raise an exception for HTTP errors
        soup = BeautifulSoup(r.text, "html.parser")
    except Exception as e:
        print(e)
        return None, None

    # Render Page (including JavaScript)
    # render_start_time = time.time()
    # r.html.render()
    # render_end_time = time.time()

    # # Rendered Page Metrics
    # metrics['whole_page_render_time'] = render_end_time - render_start_time + initial_load_time  # Total time including initial load
    # metrics['whole_page_num_requests'] = len(r.html.links)  
    # metrics['whole_page_size'] = len(r.html.html) 

    return soup



url = "https://fourstarrealty.com/properties/parker-off-pearl/#amenities"
# url = "https://thehillboulder.com/go/four-star-on-the-hill"
soup = get_website_performance_metrics(url=url)
print(soup.prettify())
