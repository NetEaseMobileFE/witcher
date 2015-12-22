# Require any additional compass plugins here.
# require 'compass/import-once/activate'

# set the css file encoding
Encoding.default_external = "utf-8"
Sass::Script::Number.precision = 10

# Set this to the root of your project when deployed:
project_path = "./app"
css_dir = "css"
sass_dir = "css/scss"
images_dir = "img"
# http_path = "http://img5.cache.netease.com/apps/asset1106/"
http_path = "/"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
# output_style = (environment == :pro) ? :compressed : :expanded
# output_style = :compact

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = false

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass scss scss && rm -rf sass && mv scss sass
Sass::Plugin.options[:debug_info] = false
sass_options = {:debug_info => false}

