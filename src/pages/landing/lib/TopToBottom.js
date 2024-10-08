// export default function TopToBottom(value) {
//     const result = document.querySelector(value);
//     if (result) {
//         document.addEventListener('scroll', () => {
//             if (
//                 document.body.scrollTop > window.innerHeight ||
//                 document.documentElement.scrollTop > window.innerHeight
//             ) {
//                 result.style.display = 'block';
//             } else {
//                 result.style.display = 'none';
//             }
//         });
//     }
// }


export default function TopToBottom(selector) {
    const button = document.querySelector(selector);

    if (!button) return;

    // Show or hide the button depending on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    // Smooth scroll back to the top when clicked
    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
