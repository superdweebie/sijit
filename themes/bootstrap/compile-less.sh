#This script will comple the less folder into the css folder
#Usage:
#
# compile-less.sh path-to-node path-to-lessc
#
echo compiling bootstrap.css
$1 $2 less/bootstrap.less css/bootstrap.css --strict-units-off --strict-maths-off

echo compiling bootstrap.min.css
$1 $2 less/bootstrap.less css/bootstrap.min.css --strict-units-off --strict-maths-off -x

echo done
