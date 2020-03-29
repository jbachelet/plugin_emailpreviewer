# plugin_emailpreviewer: Storefront Reference Architecture (SFRA)

This is the repository for the plugin_emailpreviewer plugin. This plugin enhances the app_storefront_base cartridge by providing Email preview functionalities.

This plugin introduces a new controller that allows you to preview email templates right from your browser.
This plugin is natively disabled from the production instance, and is intended to be used on testing instances only (sandboxes / development / staging).

# Getting Started

1. Clone this repository. (The name of the top-level folder is plugin_emailpreviewer.)
2. Upload the cartridge on your instance
3. Include the plugin_emailpreviewer cartridge in the cartridge path of your site
4. Open the provided endpoint through the browser: https://{instance-hostname}.demandware.net/on/demandware.store/Sites-{site-id}-Site/{locale}/EmailPreviewer-Show
5. Please note the following GET parameters:

Param              | Required ? | Description
------------------ | -----------| --------------------------------
template           | YES        | The template to use to render the email
customerNo         | NO         | The customer no to use to load the following items: first name, last name, email and password reset token.
orderNo            | NO         | The order no to use to load the order details.
url                | NO         | The url to display. Fallback with the "Home" URL.
passwordResetToken | NO         | If the customerNo is provided, then the plugin will overrides the "url" parameter with the generated URL to reset the password. Also, this parameter will be generated from the loaded customer's profile. Fallback with "passwordresettoken" value.
firstName          | NO         | The first name to display. Fallback with "FirstName" value.
lastName           | NO         | The last name to display. Fallback with "LastName" value.
email              | NO         | The emial to display. Fallback with "email@salesforce.com" value.