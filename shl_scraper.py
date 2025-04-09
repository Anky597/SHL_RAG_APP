import requests
from bs4 import BeautifulSoup
import json
import re
import time
from urllib.parse import urljoin


class SHLScraper:
    def __init__(self):
        self.base_url = "https://www.shl.com"
        self.catalog_url = "https://www.shl.com/solutions/products/product-catalog/?start={}&type={}"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        self.products = []
        # Type 1 is for Individual Test Solutions, Type 2 is for Pre-packaged Job Solutions
        self.product_types = [1, 2]

    def get_product_links(self, page_num=0, product_type=1):
        """Get all product links from a catalog page"""
        # Each page has 12 products
        start_index = page_num * 12
        url = self.catalog_url.format(start_index, product_type)
        print(f"Scraping catalog page {page_num+1} (type {product_type}): {url}")
        
        response = requests.get(url, headers=self.headers)
        if response.status_code != 200:
            print(f"Failed to fetch page {page_num+1}: {response.status_code}")
            return []
        
        soup = BeautifulSoup(response.text, 'lxml')
        product_links = []
        
        # Find all product links in the table
        product_rows = soup.select('tr')
        for row in product_rows:
            product_link = row.select_one('td a')
            if product_link and product_link.get('href'):
                full_url = urljoin(self.base_url, product_link.get('href'))
                product_name = product_link.text.strip()
                product_id = self.generate_product_id(product_name)
                product_links.append({
                    "url": full_url,
                    "product_name": product_name,
                    "product_id": product_id,
                    "product_type": "Individual Test Solution" if product_type == 1 else "Pre-packaged Job Solution"
                })
        
        return product_links

    def generate_product_id(self, product_name):
        """Generate a product ID from the product name"""
        # Convert to lowercase, replace spaces with underscores, remove special characters
        product_id = product_name.lower()
        product_id = product_id.replace(' - ', '_')
        product_id = product_id.replace(' ', '_')
        product_id = re.sub(r'[^\w_]', '', product_id)
        return f"shl_{product_id}"

    def extract_product_details(self, product_info):
        """Extract detailed information for a product"""
        url = product_info["url"]
        print(f"Scraping product: {product_info['product_name']} - {url}")
        
        response = requests.get(url, headers=self.headers)
        if response.status_code != 200:
            print(f"Failed to fetch product details: {response.status_code}")
            return None
        
        soup = BeautifulSoup(response.text, 'lxml')
        
        # Initialize product data with basic info
        product_data = {
            "product_id": product_info["product_id"],
            "product_name": product_info["product_name"],
            "url": url,
            "solution_type": product_info["product_type"],
            "remote_testing": False,
            "adaptive_irt": False,
            "product_type_keys": [],
            "product_type": [],
            "description": "",
            "target_audience": [],
            "measured_constructs": [],
            "job_roles": [],
            "industry": [],
            "features": [],
            "duration_minutes": 0
        }
        
        # Look for table rows containing Remote Testing text
        for row in soup.find_all('tr'):
            row_text = row.get_text().strip()
            if 'Remote Testing' in row_text:
                # Check if there's a green dot or checkmark in the next cell
                cells = row.find_all('td')
                if len(cells) > 1:
                    # Check for green dot image or any indicator
                    img = cells[1].find('img')
                    if img and ('green' in img.get('src', '').lower() or 'check' in img.get('src', '').lower()):
                        product_data["remote_testing"] = True
                    # Also check for text indicators like 'Yes' or '✓'
                    cell_text = cells[1].get_text().strip()
                    if cell_text and ('yes' in cell_text.lower() or '✓' in cell_text):
                        product_data["remote_testing"] = True
            
            if 'Adaptive/IRT' in row_text or 'Adaptive' in row_text:
                # Similar check for Adaptive/IRT
                cells = row.find_all('td')
                if len(cells) > 1:
                    img = cells[1].find('img')
                    if img and ('green' in img.get('src', '').lower() or 'check' in img.get('src', '').lower()):
                        product_data["adaptive_irt"] = True
                    cell_text = cells[1].get_text().strip()
                    if cell_text and ('yes' in cell_text.lower() or '✓' in cell_text):
                        product_data["adaptive_irt"] = True
        
        # Fallback to original selectors if not found
        if not product_data["remote_testing"]:
            remote_testing_element = soup.select_one('.remote-testing .green-dot')
            if remote_testing_element:
                product_data["remote_testing"] = True
                
        if not product_data["adaptive_irt"]:
            adaptive_irt_element = soup.select_one('.adaptive-irt .green-dot')
            if adaptive_irt_element:
                product_data["adaptive_irt"] = True
        
        # Look for Test Type row
        for row in soup.find_all('tr'):
            row_text = row.get_text().strip()
            if 'Test Type' in row_text:
                cells = row.find_all('td')
                if len(cells) > 1:
                    # Check for test type indicators in the cell
                    type_cell = cells[1]
                    type_text = type_cell.get_text().strip()
                    
                    # Define type mapping
                    type_mapping = {
                        'A': "Ability & Aptitude",
                        'K': "Knowledge & Skills",
                        'P': "Personality & Behavior"
                    }
                    
                    # Check for type indicators in text
                    for key, value in type_mapping.items():
                        if key in type_text or value in type_text:
                            if key not in product_data["product_type_keys"]:
                                product_data["product_type_keys"].append(key)
                            if value not in product_data["product_type"]:
                                product_data["product_type"].append(value)
                    
                    # Also check for images with alt text
                    for img in type_cell.find_all('img'):
                        alt_text = img.get('alt', '')
                        for key, value in type_mapping.items():
                            if key in alt_text or value in alt_text:
                                if key not in product_data["product_type_keys"]:
                                    product_data["product_type_keys"].append(key)
                                if value not in product_data["product_type"]:
                                    product_data["product_type"].append(value)
        
        # Fallback to the original method if no test types found yet
        if not product_data["product_type_keys"]:
            test_type_elements = soup.select('.test-type img')
            type_mapping = {
                'A': "Ability & Aptitude",
                'K': "Knowledge & Skills",
                'P': "Personality & Behavior"
            }
            
            for element in test_type_elements:
                alt_text = element.get('alt', '')
                for key, value in type_mapping.items():
                    if key in alt_text or value in alt_text:
                        if key not in product_data["product_type_keys"]:
                            product_data["product_type_keys"].append(key)
                        if value not in product_data["product_type"]:
                            product_data["product_type"].append(value)
        
        # Extract description
        description_element = soup.select_one('.product-description')
        if description_element:
            product_data["description"] = description_element.text.strip()
        
        # Extract other details from sections
        sections = soup.select('.product-details-section')
        for section in sections:
            heading = section.select_one('h3')
            if not heading:
                continue
                
            heading_text = heading.text.strip().lower()
            list_items = section.select('li')
            
            if 'target audience' in heading_text:
                product_data["target_audience"] = [item.text.strip() for item in list_items]
            elif 'measured constructs' in heading_text or 'what it measures' in heading_text:
                product_data["measured_constructs"] = [item.text.strip() for item in list_items]
            elif 'job roles' in heading_text or 'job titles' in heading_text:
                product_data["job_roles"] = [item.text.strip() for item in list_items]
            elif 'industry' in heading_text:
                product_data["industry"] = [item.text.strip() for item in list_items]
            elif 'features' in heading_text:
                product_data["features"] = [item.text.strip() for item in list_items]
        
        # Extract duration if available
        duration_pattern = r'(\d+)\s*minutes'
        for feature in product_data["features"]:
            match = re.search(duration_pattern, feature)
            if match:
                product_data["duration_minutes"] = int(match.group(1))
                break
        
        return product_data

    def scrape_all_products(self, max_pages=40):
        """Scrape all products from the catalog"""
        all_products = []
        
        # Scrape both Individual Test Solutions (type=1) and Pre-packaged Job Solutions (type=2)
        for product_type in self.product_types:
            print(f"\nScraping products for type: {product_type} ({'Individual Test Solutions' if product_type == 1 else 'Pre-packaged Job Solutions'})")
            
            # Start from page 0 and continue until we reach the end or max_pages
            for page_num in range(max_pages):
                # Get product links for the current page and product type
                product_links = self.get_product_links(page_num, product_type)
                
                # If no products found, we've reached the end for this product type
                if not product_links:
                    print(f"No more products found on page {page_num+1} for type {product_type}. Moving to next type.")
                    break
                    
                print(f"Found {len(product_links)} products on page {page_num+1}")
                
                # Process each product on the page
                for product_info in product_links:
                    # Add a delay to avoid overloading the server
                    time.sleep(1)
                    product_data = self.extract_product_details(product_info)
                    if product_data:
                        all_products.append(product_data)
                
                # Check if there's a next page
                # Each page has 12 products, if we get fewer, we've reached the end
                if len(product_links) < 12:
                    print(f"Reached the last page for type {product_type}. Moving to next type.")
                    break
        
        print(f"Total products scraped: {len(all_products)}")
        self.products = all_products
        return all_products

    def save_to_json(self, filename="shl_products.json"):
        """Save scraped products to a JSON file"""
        if not self.products:
            self.products = self.scrape_all_products()
            
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.products, f, indent=2, ensure_ascii=False)
            
        print(f"Saved {len(self.products)} products to {filename}")
        return filename


if __name__ == "__main__":
    scraper = SHLScraper()
    scraper.save_to_json()