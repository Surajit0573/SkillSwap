const List = require("../models/listings.js");

module.exports.index = async (req, res) => {
    const data = await List.find();
    res.render("./listings/index", { data });
};

module.exports.newForm = (req, res) => {
    res.render("./listings/create");
};

module.exports.create = async (req, res) => {
    let { newlist } = req.body;
    const url = req.file.path;
    const filename = req.file.filename;
    console.log(newlist);
    const list = new List(newlist);
    list.image = { url, filename };
    list.owner = req.user._id;
    console.log(list);
    await list.save()
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");

};

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const list = await List.findById(id).populate({ path: "review", populate: { path: "author" } }).populate("owner");
    if (!list) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(list);
    res.render("./listings/show", { list });
};

module.exports.editForm = async (req, res) => {
    let { id } = req.params;
    const data = await List.find({ _id: id });
    if (!data || data.length == 0) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(data);
    let imageUrl=data[0].image.url;
    imageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit", { data: data[0],imageUrl });
};

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    let { newlist } = req.body;
    let list = await List.findByIdAndUpdate(id, newlist);
    if (req.file) {
        console.log(req.file);
        const url = req.file.path;
        const filename = req.file.filename;
        list.image = { url, filename };
        await list.save();
    }
    req.flash("success", "Listing is Edited!");
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
    let { id } = req.params;
    await List.findOneAndDelete({ _id: id });
    req.flash("success", "Listing is Deleted!");
    res.redirect("/listings");
};