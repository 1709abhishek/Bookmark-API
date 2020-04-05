module.exports.upload = function (req, res) {
    const fileRows = [];
    
    try {
        csv.parseFile(req.file.path)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on("end", function () {
            console.log(fileRows);
            fs.unlinkSync(req.file.path);   // remove temp file
            //process "fileRows" and respond
        });
        return res.json(200, {
            message: "File upload successful"
        });
    } catch (error) {
        console.log('********',err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    // open uploaded file
}