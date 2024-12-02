#!/bin/sh

d=`echo $1 | sed -e 's/\(.*\)\/\(.*\).cpp/\1/'`
f=`echo $1 | sed -e 's/\(.*\)\/\(.*\).cpp/\2/'`
current_dir=$(eval pwd)

g++ -std=c++17 -g -o ${current_dir}/${d}/build/${f}.out $1
eval ${current_dir}/${d}/build/${f}.out
