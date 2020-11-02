const inquirer = require("inquirer")
const sharp = require("sharp")
const progressBar = require("progress")
const shell = require("shelljs")


module.exports = function generateIcons(iconSizes, imagePath) {
    const bar = new progressBar("Generating :generated [:bar] :etas", {total: iconSizes.length})
    inquirer.prompt({
        type: "list",
        name: "shouldCreateFolder",
        message: "Do you want to create a folder to house the icons?",
        choices: ["Yes", "No"],
    }).then(({shouldCreateFolder}) => {
        if(shouldCreateFolder === "Yes") {
            inquirer.prompt({
                name: "foldername",
                message: "What do you want to name the folder?",
            }).then(({foldername}) => {
                shell.mkdir(foldername)
                shell.cd(foldername)
                iconSizes.forEach(icon => {
                    if(icon === 16) {
                        let filename = "favicon.ico"
                        sharp(imagePath).resize(icon,icon)
                        .toFile(filename, (err, _info) => {
                            if(err) {
                                console.log(err)
                                return
                            }
                            bar.tick({
                                "generated": filename
                            })
                        })
                    }
                    let filename = `icon-${icon}x${icon}.png`
                    sharp(imagePath).resize(icon,icon)
                    .toFile(filename, (err, _info) => {
                        if(err) {
                            console.log(err)
                            return
                        }
                        bar.tick({
                            "generated": filename
                        })
                    })
                })
            })
        } else {
            iconSizes.forEach(icon => {
                if(icon === 16) {
                    let filename = "favicon.ico"
                    sharp(imagePath).resize(icon,icon)
                    .toFile(filename, (err, _info) => {
                        if(err) {
                            console.log(err)
                            return
                        }
                        bar.tick({
                            "generated": filename
                        })
                    })
                }
                let filename = `icon-${icon}x${icon}.png`
                sharp(imagePath).resize(icon,icon)
                .toFile(filename, (err, _info) => {
                    if(err) {
                        console.log(err)
                        return
                    }
                    bar.tick({
                        "generated": filename
                    })
                })
            })
        }
    }).catch(err => {
        console.log(err)
    })
}
