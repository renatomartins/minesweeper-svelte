import './Cell.css.proxy.js';
/* src/Cell.svelte generated by Svelte v3.29.4 */
import {
	SvelteComponent,
	add_render_callback,
	add_resize_listener,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	prevent_default,
	run_all,
	safe_not_equal,
	set_data,
	text,
	toggle_class
} from "../web_modules/svelte/internal.js";

import { createEventDispatcher } from "../web_modules/svelte.js";

function create_fragment(ctx) {
	let button;
	let div;
	let t_value = /*getCellIcon*/ ctx[2](/*cell*/ ctx[0]) + "";
	let t;
	let button_style_value;
	let button_resize_listener;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			div = element("div");
			t = text(t_value);
			attr(div, "tabindex", "-1");
			attr(div, "class", "svelte-noe0nm");
			attr(button, "style", button_style_value = `font-size: ${/*size*/ ctx[1] / 3}px`);
			attr(button, "tabindex", "0");
			attr(button, "class", "svelte-noe0nm");
			add_render_callback(() => /*button_elementresize_handler*/ ctx[5].call(button));
			toggle_class(button, "revealed", /*cell*/ ctx[0].revealed);
			toggle_class(button, "flagged", /*cell*/ ctx[0].flagged);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, div);
			append(div, t);
			button_resize_listener = add_resize_listener(button, /*button_elementresize_handler*/ ctx[5].bind(button));

			if (!mounted) {
				dispose = [
					listen(button, "click", /*handleClick*/ ctx[3]),
					listen(button, "contextmenu", prevent_default(/*handleRightClick*/ ctx[4]))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*cell*/ 1 && t_value !== (t_value = /*getCellIcon*/ ctx[2](/*cell*/ ctx[0]) + "")) set_data(t, t_value);

			if (dirty & /*size*/ 2 && button_style_value !== (button_style_value = `font-size: ${/*size*/ ctx[1] / 3}px`)) {
				attr(button, "style", button_style_value);
			}

			if (dirty & /*cell*/ 1) {
				toggle_class(button, "revealed", /*cell*/ ctx[0].revealed);
			}

			if (dirty & /*cell*/ 1) {
				toggle_class(button, "flagged", /*cell*/ ctx[0].flagged);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(button);
			button_resize_listener();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	let { cell } = $$props;
	let size;
	const dispatch = createEventDispatcher();

	const getCellIcon = cell => {
		if (cell.flagged) {
			return "🚩";
		} else if (!cell.revealed) {
			return "";
		} else if (cell.revealed && cell.hasBomb) {
			return "💥";
		} else if (cell.hasBomb) {
			return "💣";
		}

		const bombs = cell.bombsInVicinity;
		return bombs !== 0 ? String(cell.bombsInVicinity) : "";
	};

	const handleClick = () => {
		if (cell.isRevealable()) {
			dispatch("reveal", [cell.x, cell.y]);
		}
	};

	const handleRightClick = () => {
		dispatch("flag", [cell.x, cell.y]);
	};

	function button_elementresize_handler() {
		size = this.clientWidth;
		$$invalidate(1, size);
	}

	$$self.$$set = $$props => {
		if ("cell" in $$props) $$invalidate(0, cell = $$props.cell);
	};

	return [
		cell,
		size,
		getCellIcon,
		handleClick,
		handleRightClick,
		button_elementresize_handler
	];
}

class Cell extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { cell: 0 });
	}
}

export default Cell;