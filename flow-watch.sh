#!/bin/bash
which wr || npm i -g wr
flow status
wr --exec "clear && printf '\e[3J'; flow status" src test examples
