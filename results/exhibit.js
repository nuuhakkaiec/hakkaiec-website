const url = (id) => 'photos/' + id + '.webp';
function Gallery({ event }) {
    return React.createElement("div", { className: "photos" }, event.photos.map(([id, alt]) => (React.createElement("figure", { key: id },
        React.createElement("img", { src: url(id), alt: alt, loading: "lazy" })))));
}
function PhotoEssay({ event }) {
    const featured = event.photos.slice(0, 4);
    const remaining = event.photos.slice(4);
    return React.createElement("article", { className: "photo-essay" },
        React.createElement("div", { className: "essay-board" },
            React.createElement("div", { className: "essay-copy" },
                React.createElement("small", null, event.status),
                React.createElement("h4", null, event.name),
                React.createElement("p", null, event.steps.map(([, description]) => description).join(''))),
            featured.map(([id, caption], i) => React.createElement("figure", { className: 'essay-photo essay-photo-' + (i + 1), key: id },
                React.createElement("img", { src: url(id), alt: caption, loading: "lazy" })))),
        remaining.length > 0 && React.createElement("div", { className: "essay-roll", tabIndex: 0, role: "region", "aria-label": event.name + '照片' }, remaining.map(([id, caption]) => React.createElement("figure", { key: id },
            React.createElement("img", { loading: "lazy", src: url(id), alt: caption })))));
}
function Catalog() {
    const [group, change] = React.useState(food);
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "filters flex flex-wrap" }, [food, ai, local].map(g => React.createElement("button", { key: g, "aria-pressed": group === g, onClick: () => change(g) }, g))),
        activities.filter(e => e.category === group).map(e => {
            var _a;
            return e.category === food || e.category === local ? React.createElement(PhotoEssay, { key: e.id, event: e }) : React.createElement("article", { key: e.id },
                React.createElement("div", null,
                    React.createElement("small", null, e.status),
                    React.createElement("h4", null, e.name),
                    e.category === ai ? React.createElement("ol", { className: "course-steps" }, e.steps.map(([label, description], index) => (React.createElement("li", { key: label },
                        React.createElement("span", { className: "step-number" }, String(index + 1).padStart(2, '0')),
                        React.createElement("strong", null, label),
                        React.createElement("span", null, description))))) : React.createElement("p", null, e.steps.map(([, description]) => description).join('')), (_a = e.links) === null || _a === void 0 ? void 0 :
                    _a.map(href => React.createElement("a", { className: "pill", key: href, href: href }, "\u8AB2\u7A0B\u6210\u679C\u7E3D\u652C \u2197"))),
                e.photos.length ? React.createElement(Gallery, { event: e }) : null);
        }));
}
ReactDOM.createRoot(document.querySelector('#catalog')).render(React.createElement(Catalog, null));
function Impact() { return React.createElement("div", { className: "stats" }, metrics.map(([n, u, l]) => React.createElement("div", { key: l },
    React.createElement("b", null,
        React.createElement("span", { "data-number": n }, n),
        React.createElement("small", null, u)),
    React.createElement("p", null, l)))); }
ReactDOM.createRoot(document.querySelector('#numbers')).render(React.createElement(Impact, null));
if (!matchMedia('(prefers-reduced-motion:reduce)').matches) {
    gsap.from('.hero-copy > *', { y: 16, opacity: 0, duration: .55, stagger: .08 });
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => { if (scrollY < hero.clientHeight)
        gsap.set('.blob', { y: scrollY * .1 }); }, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => { if (!isIntersecting)
        return; observer.unobserve(target); gsap.from(target, { y: 12, duration: .55 }); if (target.id === 'impact')
        target.querySelectorAll('[data-number]').forEach(el => { const n = Number(el.dataset.number), counter = { n: 0 }; gsap.to(counter, { n, duration: 1, onUpdate() { el.textContent = counter.n.toFixed((String(n).split('.')[1] || '').length); } }); }); }));
    document.querySelectorAll('#about,#works,#impact,footer').forEach(el => observer.observe(el));
}
