# YouTube-Volume-Normalization
A minimalist Firefox extension to normalize YouTube volumes, nothing more.

# Contents
- How This Extension Works
- Explanation of YouTube Volumes
- Limitations

# How It Works
This extension simulates two mouse clicks to get the "Stats for nerds" window and reads the "content loudness" value.

If the videos "content loudness" is greater or equal to 0dB, this extension does nothing further.

Otherwise, this extension uses Web Audio API to raise the volume of the video so that the new volume will be the equivalent to having a "content loudness" of 0dB.

The "Stats for nerds" window is then closed.

# Explanation of YouTube Volumes
YouTube automatically lowers the volume of videos louder than their 0db baseline but does not raise the volume of quieter videos.

In the "Stats for nerds" window, there are three values we need to know, all three of which are found on the "Volume / Normalized" line, the first two are percentages and the third is a dB value.

The first value is the one you control by moving the volume bar, it adjusts the videos volume from 0 to 100%.

The second value tells you how much the videos volume has been lowered from its original, 100% means that it has not been changed, if it is less than 100%, then the volume has been lowered and you are adjusting the changed volume.

The third dB value is the average volume of the video before any adjustments, if it is a positive value, the video is louder than what YouTube considers 0dB, if it is a negative value, it is quieter than YouTubes 0dB.

# Limitations
- Does not work for livestreams
- Will only increase volumes by a maximum of 10dB as a safety feature
