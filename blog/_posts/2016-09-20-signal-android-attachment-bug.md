---
title: "Blog >> Signal for Android Attachment Bug"
layout: post
author: moxie0
---

We recently received a great bug report from Jean-Philippe Aumasson and Markus Vervier, who identified
a problem with the way that image, audio, and video attachments are processed by the Signal for Android
code.  We consider the implications of the bug to be low risk to Signal users, but have
[released an update](https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms)
for the Signal Android app that addresses the problems they reported.

XXXXX

## Technical details

When the Android code retrieves an audio, video, or image attachment, it verifies a cryptographic "message
authentication code" to ensure that the attachment hasn't been modified in any way while in transit.
Jean-Philippe Aumasson and Markus Vervier pointed out that a 32-bit integer was used to represent the
attachment length in that calculation.

This means that if the attachment is greater than 4GB, the integer representing the attachment's length wraps back
around starting from a value of 0.  If an attacker were to hack the Signal server and append 4GB of data to a
legitimate 1MB attachment while in transit from Bob to Alice, the code that verified the integrity of the
attachment on Alice's end would only "see" 1MB of data to verify after downloading the full (1MB + 4GB) attachment
from the server.  This is because the 32-bit integer representing the 4.001GB attachment's length wraps around
to zero at 4GB and ends up at 1MB again.  If the attacker hasn't modified that original 1MB of data, then everything
checks out fine, even though they've appended 4GB.  This is obviously not the outcome we want.

## Impact on attachment integrity

An attacker who has compromised the Signal server and wants to exploit this bug in the Android app can't
modify the original content, only append things to it.  The attacker's first problem is that they can't append
*less* than 4GB of data.  Doing anything with image attachments becomes difficult, since Android phones don't
have the memory capacity to display a 4GB+ image.

The next problem for the attacker is that they don't know the AES key that was used to encrypt the attachment they're
trying to append 4GB of data to.  Without prior knowledge through some other channel, they also don't know what the
attachment content is, or even what the attachment's content type is.  Whatever they append is going to get decrypted
by the recipient with a unique key the attacker doesn't know, so 4GB of arbitrary appended content will just get
transformed into 4GB of random data.

However, without knowing the key, the attacker could append the original ciphertext (or fragments of it) to the attachment
over and over again, even if they don't know what it decrypts to.  The repeated ciphertext fragments can be arranged so
that they will decrypt to their original plaintext values, with a 48-byte "error block" at the
first boundary, and 16-byte "error blocks" where each subsequent section of ciphertext is appended.

It's likely that some audio or video containers and codecs are forgiving enough to play through the error blocks and the
malformed container.  When receiving such a file, the original audio or video attachment would play through unmodified,
followed by 4GB of repeated fragments of it.  Additionally, if the attacker had some prior knowledge of the original
attachment plaintext through some other channel, they could append sections that decrypt to 16 bytes of random data (unknown
to the attacker) followed by 16 bytes chosen by the attacker.

## Fixes

We've [released an update](https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms&hl=en) to the Android
app (3.19.0) which includes a fix.  Signal for iOS and Desktop were not affected, nor were other consumers of Signal Protocol.
Non-attachment message confidentiality and integrity was not affected.  We're publishing our analysis to make as much
information available as possible, but given both the limited impact of this bug and the set of circumstances necessary
to exploit it, we consider this to have been of low risk to Signal for Android users.

This is the first time that anyone has ever found a bug like this in Signal, though, so huge thanks to Jean-Philippe Aumasson
and Markus Vervier for helping to further improve the security and stability of the app.