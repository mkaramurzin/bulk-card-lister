# bulk-card-lister
This project is a supplement to an existing ebay tool called file exchange (https://www.ebay.com/sh/reports) which is the most efficient way to create tens or hundreds of ebay listings. It is a tool where instead of making a listing for an item the normal way, you download a .csv template and fill each cell with data about your listing and then upload the file to ebay. If you entered all the data correctly, every row of the sheet is made into a listing.

Me and my partner have made hundreds of listings in a single week for a Magic the Gathering card business; my partner is not tech-savy to the extent I am and prefers to make his listings one by one while I prefer to use the ebay file exchange tool to launch 20-50 listings at a time. Both of our methods are flawed; my partner is often filling out the same information except for 3-4 peices of information and I while have the luxury of being able to copy an paste the redundant listing information, I had to decipher and refer back to the 150 page guide on how to use the tool: https://pics.ebay.com/aw/pics/pdf/us/file_exchange/File_Exchange_Advanced_Instructions.pdf. Additionally, I'm entering information into a plain excel sheet and only know if I made any errors at the very end when I upload the file. Just one typo or misinput can lead to a lot of time loss especially since the error report that ebay spits out tend to be inconcise.

All this is to say that this tool from ebay is very outdated and isn't intuitive enough for most ebay users to use. I saw this as an oportunity to solve something close to a real-world problem. The idea was to bridge the gap between my partner's method and my method of creating ebay listings. Something that had the efficiency of the file exchange tool and the intuition of the normal ebay listing process with some quality of life aspects sprinkled in like the ability to save a template of inputs for repeated use.

My first attempt at this solution can be seen on https://ebay-tool.herokuapp.com/. This approach was django heavy and very dynamic, it would work with any ebay template from any category, but I wasn't satisfied with the result because it wasn't nearly as intuitive to use as the ideal solution I had in mind. 

To make the program intuitive to the extent I needed it to be, I had to switch to a javascript and html heavy approach; guiding the user with info icons and dropdown menus for information where the intuitive input wouldn't be accepted by the file upload. The tradeoff is that this version is highly specialized compared to the other approach. Since I was creating the dropdowns and info icon contents by hand and different templates have different data inputs, I had to build the tool around the eBay CCG Individual card template. Furthermore, some listing info like "character" have hundreds of options to select from and depending on what your input is for the "game" prompt you will get entirely different options from some of the other listing inputs so the dropdowns are limited for some inputs as a result.

The tool is highly specialized for the use of me and my partner, but otherwise I consider it to be a valid solution and we are probably the only people that would use it anyways. I'll admit couldn't solve the problem entirely in the dynamic fashion that the first approach had in mind but I'll gladly settle for a proof of concept that solves a personal problem. 

# Hosted with Azure
https://ebay-tool-karamurzin.azurewebsites.net/

# How to run
 1. Git clone the repository
 2. Navigate to the file directory in your terminal
 3. Enter the command "python manage.py runserver"
 4. Navigate to your local server in your web browser
 5. Fill out information about your listing(s)
 6. Download the file at the end
 
# Files
BulkLister
 - Static
    - index.js : the javascript code for index.html and api functionality
    - tooltip.js : the javascript code for tooltips
    - styles.css : the css code for the site's design
 - Templates
    - index.html : the main page of the project containing all listing information inputs
    - layout.html : the layout shared by all pages
    - login.html : login page
    - register.html : register page
    - download.html : page for downloading csv file with listing info
    - saved.html : page that holds all saved templates
    
 - views.py : python code for rendering pages, receiving json inputs, and other backend duties like storing data in models
 - models.py : python code for the data models user, field, lisitng info, session, and templates
 - urls.py : python code for various urls and api paths
