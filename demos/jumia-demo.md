# Jumia Kenya Shopping Demo Automation

This script demonstrates navigating a live e-commerce site, handling popups, and managing a shopping cart.

```web run
# --- 1. Navigate and Handle Popups ---
# @goto https://www.jumia.co.ke/phones-tablets/
# @wait 2s

# Close newsletter popup if it appears (flexible selector)
# @click button[aria-label="newsletter_popup_close-cta"]
# @wait 1s
# @click button:has-text("Accept cookies")
# @wait 1s

# Wait for all background assets, images, and scripts to settle
# @waitUntilIdle

# --- 2. Select first product ---
# @scrollToFirst [data-catalog] [data-sku]
# @wait 3s
# @clickFirst [data-catalog] [data-gtm-id]

# --- 3. Add to Cart ---
# @waitUntilIdle
# @clickText "Add to cart"
# @wait 2s

# --- 4. Go to Cart ---
# @click a[href="/cart/"]
# @wait 3s
```
