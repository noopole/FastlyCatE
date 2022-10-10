import { Router } from "@fastly/expressly";

const backend = "origin_0";
const router = new Router();

// Configure middleware that runs on all requests.
router.use(async (req, res) => {
  // This fiddle has a pre-populated dictionary.
  // See: https://developer.fastly.com/learning/vcl/fiddle/data/
  // to learn more about specifying data sources for Fiddle.
  const redirects = new Dictionary("dict_name");
  const dest = redirects.get(req.urlObj.pathname);

  if (dest) {
    res.redirect(dest, 308);
  }

  res.send(await fetch(req, { backend }));
});

router.listen();
