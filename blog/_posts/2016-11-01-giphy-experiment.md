---
title: "Blog >> Signal and GIPHY"
layout: post
author: moxie0
---

The latest Signal release for Android includes support for GIF search and browsing.  Signal has long
supported sending and receiving GIFs, but this is an experiment that allows users to browse, search, and select
popular GIFs from within Signal.

<video width="740" loop autoplay>
 <source src="/blog/images/giphy.webm" type="video/webm" /> 
 <source src="/blog/images/giphy.mp4" type="video/mp4" />
</video>

XXXXX

## GIFs and privacy

GIF search engines like GIPHY, Tenor, and Guggy have made this type of functionality increasingly popular. They
provide network APIs that allow an app to easily expose trending and search functionality for GIFs.

For instance, if someone messages you with an invitation, you might want to write back with a message that says
"I'm excited." With integrated GIF search, you could instead do a GIF search for "I'm excited" and send one of
the results instead.

<iframe src="//giphy.com/embed/3oEjHZPivwdJ0syhKE" width="480" height="268" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

<p></p>

Of course, as you type your search, it's transmitted over the network to the GIF search engine:

`````
http://api.giphy.com/v1/gifs/search?q=I&api_key=dc6zaTOxFJmzC
http://api.giphy.com/v1/gifs/search?q=Im&api_key=dc6zaTOxFJmzC
http://api.giphy.com/v1/gifs/search?q=Im+&api_key=dc6zaTOxFJmzC
http://api.giphy.com/v1/gifs/search?q=Im+e&api_key=dc6zaTOxFJmzC
http://api.giphy.com/v1/gifs/search?q=Im+ex&api_key=dc6zaTOxFJmzC
http://api.giphy.com/v1/gifs/search?q=Im+exc&api_key=dc6zaTOxFJmzC
http://api.giphy.com/v1/gifs/search?q=Im+exci&api_key=dc6zaTOxFJmzC
http://api.giphy.com/v1/gifs/search?q=Im+excit&api_key=dc6zaTOxFJmzC
http://api.giphy.com/v1/gifs/search?q=Im+excite&api_key=dc6zaTOxFJmzC
http://api.giphy.com/v1/gifs/search?q=Im+excited&api_key=dc6zaTOxFJmzC
`````

This is of some concern.  While it might seem silly to worry about GIF search confidentiality, what you search for is in
some sense the "content" of your message.  Instead of sending "I'm excited," you searched "I'm excited." Message content
(or anything like it) is always something we want to think carefully about.

## An experimental approach

Any practical approach requires that the search term be transmitted to the GIF search engine.  Ideally, however, it would be done
in a way that doesn't provide the GIF search engine's operator with the knowledge of who issued the search.

Some messaging services act as a plaintext proxy for the GIF searches.  The app transmits the plaintext search term to the
messaging service, which queries the GIF search engine server-side and transmits the results back to the client.  While
that does hide from the GIF search engine the identity of the user who issued the search, it is actually worse than issuing
an unproxied search directly, since the messaging service itself is given plaintext access to both the search term and the
GIF the user selects.  Obviously, a privacy preserving messaging service should not have access to that kind of plaintext.

The GIPHY API has an HTTPS endpoint which Signal uses to provide a different kind of proxy.  When querying GIPHY:

1. The Signal app opens a TCP connection to the Signal service.
1. The Signal service opens a TCP connection to the GIPHY HTTPS API endpoint and relays bytes between the app and GIPHY.
1. The Signal app negotiates TLS through the proxied TCP connection all the way to the GIPHY HTTPS API endpoint.

Since communication is done via TLS all the way to GIPHY, the Signal service never sees the plaintext contents
of what is transmitted or received.  Since the TCP connection is proxied through the Signal service, GIPHY doesn't
know who issued the request.

The Signal service essentially acts as a VPN for GIPHY traffic: the Signal service knows who you are, but not what
you're searching for or selecting.  The GIPHY API service sees the search term, but not who you are.

<img src="https://i.giphy.com/KQ6n4iPBTCAp2.gif"/>

## Caveats

While this does hide your IP address from GIPHY and your search terms from Signal, there are some caveats.  The GIPHY
service could use subtleties like TLS session resume or cache hits to try to correlate multiple requests as having
come from the same client, even if they don't know the origin.

Similarly, the Signal service that's proxying traffic could attempt to measure the amount of data transmitted in order to
discern something about the GIFs being retrieved from GIPHY.

We'll continue to look at things like adding padding or disabling TLS session resume for these requests in order to
push things further.  We're evaluating how this works in the Android app, and will extend it to iOS and the Desktop
shortly. Try it out!

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
