const marked = require("marked");
const sanitizeHtml = require("sanitize-html");
const fs = require("fs");
const path = require("path");

// Adding the path to the images folder when parsing img tags
marked.use({
 extensions: [{
    name: 'image',
     renderer(token) {
	 const imagePath = path.join('assets/imgs', token.href);
	 let ret = `<img src="${imagePath}" alt="${token.text}"/>`;
	 return ret;
     }
  }]
});

/**
 * Convert md files to HTML and collect its metadata.
 * @param {Dirent} files - The files to convert.
 * @param {String} dir - The sub-directory if there is one.
 * @returns {[{text: Document, metadata: Object}]} A list of the resources
 *						   and their meta data.
 */
function getResources(files, resourcePath, dir="") {
    let resources = [];

    files.forEach(file => {
	const currPath = path.join(resourcePath, dir, file);
	const isDirectory = fs.statSync(currPath).isDirectory();
	const fileName = file.replace(/.md/i, '');

	// recursively get the resources that are in directories
	if (isDirectory) {
	    let files = fs.readdirSync(currPath);
	    resources.push(...getResources(files, resourcePath, path.join(dir, file)));
	}

	else {
	    if (!file.match(".md$"))
		return;

	    let text = fs.readFileSync(currPath, "utf8");
	    let rawMetadata = text.match(/(?<=\[\/\/]: # \()[^\)]*/gm);
	    let metadata = {
		fileName: fileName,
		title: fileName,
		endpoint: '/' + fileName
	    };

	    // extract page information from the metadata in the file
	    if (rawMetadata) {
		rawMetadata.forEach(data => {
		    let splitData = data.split(/ (.*)/s);
		    metadata[splitData.shift().toLowerCase()] = splitData.shift();
		});
	    }

	    if (dir)
		metadata.folder = dir.split('/').pop();

	    let parsedHTML = sanitizeHtml(marked.parse(text), {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
	    });

	    // addTOCid(parsedHTML);

	    resources.push({text: parsedHTML, metadata: metadata});
	}
    });

    return resources;
}


/**
 * Sorts the resources according to the direactory they're in.
 * @param {[Object]} resources - A list of all the resources to sort.
 * @returns {[Object, Array]} An object with the files sorted by directory, and
 *			      the rest of the resources.
 */
function getNavData(resources) {
    let allDirs = new Set(resources.map(r => r.metadata.folder));
    let dirs = {};
    let rest = resources.filter(r => r.metadata.folder == undefined).map(r => r.metadata);

    for (let dir of Array.from(allDirs)){
	if (dir == undefined)
	    continue;
	let res = resources.filter(r => r.metadata.folder == dir);
	dirs[dir] = res.map(r => r.metadata);
    }

    return ([dirs, rest]);
}

module.exports = { getResources, getNavData };
