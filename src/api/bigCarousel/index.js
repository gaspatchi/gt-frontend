import { wp_api_endpoint, wp_slider_category } from "../config";
import axios from "axios";
import _ from "lodash";

async function getSlides() {
	let slides = [];
	let slidesPosts = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, { timeout: 2000, params: { categories: wp_slider_category, per_page: 10 } });
	slidesPosts = _.filter(slidesPosts.data, "featured_media");
	for (let post in slidesPosts) {
		let image = await axios.get(`${wp_api_endpoint}/wp/v2/media/${slidesPosts[post].featured_media}`, { timeout: 2000 });
		slides.push(image.data);
	}
	return slides;
}

export default getSlides;