function createWriter(text) {
    text = text.replace('$', ',');
    texts = text.split(' ');
    fullText = [];

    for (var i = 0; i < texts.length; i++) {

        var changed_color = null;

        if (i == texts.length - 1) {
            changed_color = '#ff0000';
        }

        const content = document.createElement('content' + i);
        
        if (changed_color) {
            content.setAttribute('class', 'custom-border');
        } else {
            content.setAttribute('class', 'fade-out');
        }

        content.setAttribute('id', 'content' + i);
        document.getElementById(i).appendChild(content);
        for (var j = 0; j < texts[i].length; j++) {
            const newChar = document.createElement('div');
            newChar.setAttribute('id', texts[i][j] + i);
            content.appendChild(newChar);

            var writer = HanziWriter.create(texts[i][j] + i, texts[i][j], {
                width: 50,
                height: 50,
                padding: 5,
                showOutline: false,
                strokeAnimationSpeed: 5, // 5x normal speed
                delayBetweenStrokes: 10, // milliseconds
                showCharacter: false,
                // strokeColor: '#ffffff'
            });

            if (changed_color) {
                writer.updateColor('strokeColor', changed_color);
            }

            fullText.push(writer);
        }
    }
    return fullText;
}

var text = '寵極愛還歇 妒深情卻疏 長門一步地 不肯暫回車 雨落不上天 水覆重難收 君情與妾意 各自東西流 昔日芙蓉花 今成斷根草 以色事他人 能得幾時好 李白';
// var text = '好';

function looping(text, first, second, original_text) {
    text[first].animateCharacter({
        onComplete: function () {
            if (second == text.length) {
                document.getElementById('content' + (original_text.split(' ').length - 1)).classList.toggle('border-animation');
                return;
            } else {
                looping(text, second, second + 1, original_text);
            }
        }
    });
}

// looping(createWriter(text), 0, 1, text);

function timeoutLoop(start, end, first = false, last = false, endLoop = false) {
    timeout = first ? 50000 : (last ? 3000 : 1500);
    setTimeout(function () {
        if (last) {
            document.getElementById('content' + end).classList.remove('border-animation');
            document.getElementById('content' + end).classList.toggle('fade-out');
            timeoutLoop(end, end, false, false, true);
        } else {
            document.getElementById('content' + start).classList.toggle('hide');
            setTimeout(function () {
                document.getElementById('content' + start).remove();
            }, 1500);

            if (!endLoop) {
                timeoutLoop(start + 1, end, false, start + 1 == end);
            }
        }
    }, timeout);
}

function strokeAnimation(text) {
    looping(createWriter(text), 0, 1, text);
    texts = text.split(' ');
    timeoutLoop(0, texts.length - 1, true);
}
// looping(createWriter(text), 0, 1, text);
strokeAnimation(text);
setInterval(strokeAnimation, 100000, text);
