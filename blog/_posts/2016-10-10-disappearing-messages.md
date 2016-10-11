---
title: "Blog >> Disappearing messages for Signal"
layout: post
author: moxie0
---

<img src="/blog/images/disappearing-messages.jpg" alt="Disappearing messages screenshot"/>

The latest Signal release for iPhone, Android, and Desktop now includes support for disappearing messages.

## The timer has come

With this update, any conversation can be configured to delete sent and received messages after a specified interval.
The configuration applies to all parties of a conversation, and the clock starts ticking for each recipient once
they've read their copy of the message.

XXXXX

Disappearing messages are a way for you and your friends to keep your message history tidy.  They are a collaborative
feature for conversations where all participants want to automate minimalist data hygiene, not for situations where your
contact is your adversary &mdash; after all, if someone who receives a disappearing message really wants a record of it, they can
always use another camera to take a photo of the screen before the message disappears.

The disappearing timer values range from five seconds to one week, giving you a range of options for ephemeral
message history.

## There's safety in numbers

This release also includes support for Signal Protocol's numeric fingerprint format, which are called "safety numbers" in Signal.

<img src="/blog/images/safety-numbers.jpg" alt="Safety numbers screenshot"/>

Safety numbers can be verified by either scanning a QR code or by reading a string aloud.  The numeric
fingerprint format has several advantages over the old hex strings:

1. They're easy to localize. Hexadecimal isn't compatible with all alphabets, so it left a lot of
   people out. Likewise, using a wordlist from a single language wouldn't be very accessible, and trying
   to localize wordlists to make cross-language comparisons possible is very error prone.  However,
   all common languages have a representation for base 10 digits that safety numbers can easily be
   localized into.

1. They're visually and audibly distinct.  Numeric representations in all languages have a lot of
   evolution behind them, and have been pushed towards visual and audible distinguishability.

1. They're relatively compact.  Users compare 12 groups of 5 digits with each other, which is half
   the size of our previous hexadecimal format.

## View source

As always, all of our code is free, open source, and [available on GitHub](https://github.com/whispersystems).
Dedicated development is supported by [community donations](https://freedom.press/bundle/encryption-tools-journalists)
and grants. Signal contains no advertisements, and it doesn't cost anything to use. Try it out!

<div class="badgebox" style="display: block; margin-left: auto; margin-right:auto; max-width:100%;text-align:center;">
<a href="https://itunes.apple.com/us/app/signal-private-messenger/id874139669"><img src="/blog/images/appstore.png" style="display:inline;margin-left:auto;margin-right:auto;"/></a>
<a href="https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms">
  <img alt="Get it on Google Play"
       src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" width="199" style="display:inline;"/></a>
<a href="https://chrome.google.com/webstore/detail/signal-private-messenger/bikioccmkafdpakkkcpdbppfkghcmihk">
  <img alt="Get it in the Chrome Web Store"
       src="https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png" style="display:inline;"/>
</a>
</div>
