import { wp_api_endpoint, wp_slider_category } from "../config";
import axios from "axios";
import _ from "lodash";

async function getSlides() {
	let slides = await axios.get(`${wp_api_endpoint}/wp/v2/posts`, {
		timeout: 6000,
		params: { categories: wp_slider_category, per_page: 10 }
	});
	slides = _.map(slides.data, slide =>
		_.pick(slide, ["id", "title", "content", "better_featured_image"])
	);
	return slides;
}

export default getSlides;
