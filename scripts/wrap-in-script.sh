mkdir -p tmp/$1
rm -r tmp/$1
touch tmp/$1
echo '<script>' > tmp/$1
cat $1 >> tmp/$1
echo '\n</script>' >> tmp/$1
cp tmp/$1 $1
rm -r tmp
