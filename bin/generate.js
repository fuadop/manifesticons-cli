#!/usr/bin/env node

const { program } = require("commander")
const figlet = require("figlet")
const chalk = require("chalk")
const inquirer = require("inquirer")
const fs = require("fs")
const path = require("path")
const generateIcons = require("./generateIcons")

console.log(chalk.green(figlet.textSync("#!", {
    horizontalLayout: "full"
})))
program.version("1.0.0")
.option("-f, --file <path>", "Image file path to generate icons from.")
.parse(process.argv)


const iconSizes = [16, 72, 96, 128, 144, 152, 192, 384, 512]


if(program.file) {
    const imagePath = path.resolve(program.opts().file)
    if(fs.existsSync(imagePath)) {
        generateIcons(iconSizes, imagePath)
    } else {
        console.log(chalk.bgRed.white.bold("Cannot resolve the path specified ❌"))
    }
} else {
    inquirer.prompt({
        name: "imagePath",
        message: "Specify the image path: ",
    }).then(({imagePath}) => {
        const absPath = path.resolve(imagePath)
        if(fs.existsSync(absPath)) {
            generateIcons(iconSizes, absPath)
        } else {
            console.log(chalk.bgRed.white.bold("Cannot resolve the path specified ❌"))
        }
    })
}