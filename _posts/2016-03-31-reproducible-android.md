---
title: "Blog >> Reproducible Signal builds for Android"
layout: post
author: moxie0
---

As of our latest Android release, Signal builds are reproducible.  Reproducible builds help to verify
that the source code in our [GitHub repository](https://github.com/whispersystems/Signal-Android)
is the exact source code used to build the compiled Signal APK being distributed through Google Play.

XXXXX

The process of verifying a build can be done through a Docker image containing an Android build environment
that we've published.  Verifying an APK should be fairly straightforward once you have Docker setup:

```
# Clone the Signal Android source repository
$ git clone https://github.com/WhisperSystems/Signal-Android.git && cd Signal-Android

# Check out the release tag for the version you'd like to compare
$ git checkout v[the version number]

# Build using the Docker environment
$ docker run --rm -v $(pwd):/project -w /project whispersystems/signal-android:0.2 ./gradlew clean assembleRelease

# Verify the APKs
$ apkdiff/apkdiff.py build/output/apks/project-release-unsigned.apk path/to/SignalFromPlay.apk
```

Just like that, you can ensure that the source code you're looking at is the source code that's
being compiled and distributed.

## Remaining Work

Reproducible builds for Java are simple, but the Signal Android codebase includes some native shared libraries that we
employ for voice calls (webrtc, etc).  At the time this native code was added, there was no Gradle NDK support yet,
so the shared libraries aren't compiled with the project build.

Getting the Gradle NDK support setup and making its output reproducible will likely be more difficult.

## Please don't freak out

Just to head off the inevitable deluge of GPG encrypted emails with dramatic subject lines, we are not
doing this in response to any kind of legal threat or presssure.  This is just a weekend hack, please
don't make us regret it.
