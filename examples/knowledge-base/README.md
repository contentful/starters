# A statically generated knowledgebase example using Next.js and Contentful

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using [Contentful](https://www.contentful.com/) as the data source.

## Deploy your own

Using the Deploy Button below, you'll deploy the Next.js project as well as connect it to your Contentful space using the Vercel Contentful Integration.

[![Deploy with Vercel](https://vqercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fcms-contentful&project-name=nextjs-contentful-blog&repository-name=nextjs-contentful-blog&demo-title=Next.js+Blog&demo-description=Static+blog+with+multiple+authors+using+Preview+Mode&demo-url=https%3A%2F%2Fnext-blog-contentful.vercel.app%2F&demo-image=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1625705016%2Ffront%2Fexamples%2FCleanShot_2021-07-07_at_19.43.15_2x.png&integration-ids=oac_aZtAZpDfT1lX3zrnWy7KT9VA&env=CONTENTFUL_PREVIEW_SECRET&envDescription=Any%20URL%20friendly%20value%20to%20secure%20Preview%20Mode)

## How to use

### Step 1. Set up environment variables

From your contentful space, go to **Settings > API keys**. There will be an example Content delivery / preview token - you can use these API keys. (You may also create a new key.)

Next, copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `CONTENTFUL_SPACE_ID` should be the **Space ID** field of your API Key
- `CONTENTFUL_ACCESS_TOKEN` should be the **[Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) - access token** field of your API key
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN` should be the **[Content Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/) - access token** field of your API key
- `CONTENTFUL_PREVIEW_SECRET` should be any value you want. It must be URL friendly as the dashboard will send it as a query parameter to enable preview mode

Your `.env.local` file should look like this:

```bash
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_PREVIEW_ACCESS_TOKEN=...
CONTENTFUL_PREVIEW_SECRET=...
```

### Step 2. Run the project locally

```bash
npm install

# or

yarn install
```

```bash
npm build

# or

yarn build
```

```bash
npm start

# or

yarn start
```

Your knowledgebase project should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](we need to maybe have a open discussions over here).

### Step 3. Try preview mode

In your Contentful space, go to **Settings > Content preview** and add a new content preview for development.

The **Name** field may be anything, like `Development`. Then, under **Content preview URLs**, check **Post** and set its value to:

```
http://localhost:3000/api/preview?secret=<CONTENTFUL_PREVIEW_SECRET>&slug={entry.fields.slug}
```

Replace `<CONTENTFUL_PREVIEW_SECRET>` with its respective value in `.env.local`.

Once saved, go to one of the posts you've created and:

- **Update the title**. For example, you can add `[Draft]` in front of the title.
- The state of the post will switch to **CHANGED** automatically. **Do not** publish it. By doing this, the post will be in draft state.
- In the sidebar, you will see the **Open preview** button. Click on it!

You will now be able to see the updated title. To exit preview mode, you can click on **Click here to exit preview mode** at the top of the page.

### Step 4. Deploy on Vercel

Your project was already deployed to [Vercel](https://vercel.com). You can check the ([Documentation](https://nextjs.org/docs/deployment)) and deploy again from the platform.

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and check if they match your `.env.local` file.

### Step 5. Setup the webhook in Contentful

Log in to Contentful and set up a [webhook](https://app.contentful.com/spaces/<YOUR_SPACE_ID>/settings/webhooks). Webhooks are HTTP callbacks which can be used to send notifications when data in Contentful is changed, allowing external systems to react to changes to do things such as trigger a website rebuild or send a notification to a chat application. This will allow to deploy this website to Vercel every time you will make any changes to your content.

[Read more about webhooks](https://www.contentful.com/developers/docs/concepts/webhooks/) and [Webhook management API](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhooks)
