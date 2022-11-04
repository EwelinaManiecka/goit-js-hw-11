import "./sass/index.scss";
import Notiflix, {Notify} from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {searchQuery} from "./serverAPI";
import { createGalleryMarkup } from "./markup";

const formElement = document.querySelector(".search-form");
const galleryElement = document.querySelector(".gallery");
const buttonElement = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".gallery a", {CaptionDelay: 250, captions: true, captionData: "alt"});

formElement.addEventListener("submit", seachInformation);
buttonElement.addEventListener("click", onButtonClick);

async function seachInformation(event) {
    event.preventDefault();
    buttonElement.classList.add("visually-hidden");
    searchQuery.page = 1;

    const query = event.target.elements.searchQuery.value.trim();

    const response = await searchQuery.searchPhoto(query);
    // console.log(response);
    const galleryItem = response.hits;

    try {
        galleryElement.innerHTML = "";
        if(galleryItem.length === 0) {
            Notiflix.Notify.info("Sorry, there are no imagen matching your search query.");
        } else if (!query) {
            Notiflix.Notify.info("Enter key word for search.");
            // return;
        } else {
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            renderingMarkup(response.hits);
            buttonElement.classList.remove("visually-hidden");
        }
    } catch (error) {
        console.log(error.message);
    }
};

async function onButtonClick() {
    searchQuery.page += 1;

    const response = await searchQuery.searchPhoto();
    if (searchQuery.page > response.totalHits / searchQuery.per_page) {
        buttonElement.classList.add("visually-hidden");
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results");
    }
    renderingMarkup(response.hits);

    const { height: cardHeight} = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
};

function renderingMarkup(array) {
    galleryElement.insertAdjacentHTML("beforeend", createGalleryMarkup(array));
    lightbox.refresh();
}