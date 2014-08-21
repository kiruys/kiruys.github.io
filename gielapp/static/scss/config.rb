# Compass config file
# Reference: http://compass-style.org/help/tutorials/configuration-reference/
# author: Kirsten Ruys


# specify folders
sass_dir		= ""
css_dir			= "../css"
images_dir		= "../img"
javascripts_dir	= "../js"


# The environment mode. Defaults to :production, can also be :development
environment = :development


# You can select your preferred output style here (:expanded or :nested or :compact or :compressed)
output_style = (environment == :production) ? :compressed : :compact

# Indicates whether line comments should be added to compiled css that says where the selectors were defined. 
# line_comments = false

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true


# Uncomment http_path and change value if relative_assets setting isn't used. 
# Set this to the root of the static folder your project when deployed:
# http_path = "http://www.example.com/static/"
