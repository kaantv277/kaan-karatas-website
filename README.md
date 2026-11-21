# Kaan Karataş — Personal Academic Website

A lightweight, responsive static website built with HTML, CSS, and minimal JavaScript. It can be hosted free with GitHub Pages.

## Preview locally

Open `index.html` in a browser, or use the Live Server extension in Visual Studio Code.

## Publish with GitHub Pages

1. Create a new public repository on GitHub (for example, `kaan-karatas-website`).
2. Upload the contents of this folder to the repository's root. The `index.html` file must be at the root.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. The address will be shown in the Pages settings.

## Add a custom domain later

1. Register a domain with a domain registrar. Domain registration usually has an annual fee.
2. In **Repository → Settings → Pages → Custom domain**, enter your domain (for example, `kaankaratas.com`) and save.
3. At your registrar, add the DNS records GitHub Pages specifies for your domain. For an apex domain, GitHub commonly uses four A records; for `www`, it commonly uses a CNAME to your GitHub Pages hostname. Follow the current values shown in GitHub's official documentation.
4. Wait for DNS propagation, then enable **Enforce HTTPS** in Pages settings when it becomes available.

The website hosting can remain free; the custom domain itself is normally paid annually.

## Before publishing

- Add an approved biography to `about/index.html`.
- Add the approved essay registry URL to `writing/index.html`.
- Add an approved contact method to `contact/index.html`.
- Review all public information before making the repository public.

No analytics, tracking cookies, external forms, or third-party scripts are included. The site uses system fonts and makes no third-party font requests.
