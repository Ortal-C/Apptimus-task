`use strict`;

var gBanners = [];
const KEY = `banners-data`
const element_id = 'banners-list'

function onLoad() {
    gBanners = JSON.parse(localStorage.getItem(KEY)) || [];
    gBanners.forEach(banner => createNewBanner(banner.redirect_link, banner.banner_img));
}

function createNewBanner(redirect_link, banner_img) {
    const elBanner = document.createElement("div");
    elBanner.id = element_id;
    const elBanner_link = document.createElement("a");
    elBanner_link.href = redirect_link;
    const elBanner_img = document.createElement("img");
    elBanner_img.src = banner_img;
    elBanner_link.appendChild(elBanner_img)
    elBanner.appendChild(elBanner_link)
    gBanners.push({ redirect_link: redirect_link, banner_img: banner_img })
    document.body.appendChild(elBanner)
    return elBanner;
}

function onSubmit(ev) {
    if (ev) ev.preventDefault();
    let userMsg = '';
    const redirect_link = document.querySelector(`#redirect_link`).value;
    const banner_img = document.querySelector(`#banner_img`).value;
    if (redirect_link.length > 0 && banner_img.length) {
        createNewBanner(redirect_link, banner_img)
        userMsg = `Banner added succesfully.`
    }
    else {
        userMsg = `Can't creat a banner with missing URLs.`
    }
    document.querySelector('form').reset();
    setUserMsg(userMsg);
}

function onSave() {
    localStorage.setItem(KEY, JSON.stringify(gBanners))
    setUserMsg(`Banners saved to storage.`);
}

function onClear() {
    localStorage.removeItem(KEY)
    gBanners.forEach(banner => document.getElementById(element_id).remove())
    gBanners = []
    setUserMsg(`Banners removed from storage.`);
}

function setUserMsg(txt) {
    const elMsg = document.querySelector('.msg')
    elMsg.innerText = txt
    setTimeout(() => elMsg.innerText = '', 2500)
}