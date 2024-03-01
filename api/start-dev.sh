#! /bin/bash

trap "kill 0" SIGINT
nodemon -r dotenv/config app dotenv_config_path=.env | bunyan
