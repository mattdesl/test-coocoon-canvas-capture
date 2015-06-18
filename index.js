// This demo shows off custom text rendering and measuring.
// It cycles through a few different examples.

var wrap = require('word-wrapper')

// our font for the canvas
var fontSize = 35
var fontStyle = fontSize + 'px Baghdad, monospace'
var lineHeight = fontSize * 0.9

// some sample text to word-wrap
var code = JSON.stringify(require('./package.json'), undefined, 2)
// var lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus, elit nec rutrum interdum, ipsum nulla auctor magna, ut tincidunt turpis ex efficitur orci. Aenean maximus interdum diam, nec consequat sapien ullamcorper ac. In et tortor dictum, commodo enim ac, sodales dolor.'
var lipsum = 'ومضى مشاركة الإطلاق أم ذلك, فقد ما هنا؟ الحدود. ثم جهة اعلان اليابانية, قبل قامت للسيطرة الأوروبيّون هو. فقامت النفط الوراء ما بحق. الخاصّة المتساقطة، ما دار, بلا وبعد مساعدة من, قام بحشد حالية ما. أم تجهيز الأولى الساحة لها, نفس إذ مكّن الستار انتباه, بـ أضف ويعزى اليابان،. بل أعمال أدوات وانهاء بحق, بشكل الفرنسي جهة ٣٠.\n\nلم بحث اللا اعلان باستخدام, بتخصيص اللازمة لمّ ما, ذلك العسكري الأهداف أم. ترتيب وعُرفت الإحتفاظ أخر عن, تم ضرب تجهيز لهيمنة الإقتصادي. الحكم وبحلول ٣٠ إيو. الا وبحلول تكتيكاً لم. اسبوعين واقتصار اليابانية ان وتم. يبق طوكيو يونيو الأهداف أم, الأخذ أوروبا الموسوعة بها ٣٠.\n\n٣٠ وفي فكانت الشمل مساعدة. الشتاء، الفرنسي الخارجية أي يبق, ٣٠ وفي جنوب المدن التغييرات. أم لإعادة ليرتفع دول. وعلى إختار الأوروبية بها لم. ان ونتج الرئيسية إيو. وصغار ديسمبر الإحتفاظ هو حدى, بـ بعض كُلفة وحلفاؤها.'
var multiline = 'ميكو هو إنسان الرهيب الذي تفوح منها رائحة. انه يحتاج الى الاستحمام أكثر وارتداء ملابس نظيفة. الحصن هي في الواقع تبريد السيارات التي أدلى بها شركة فورد للسيارات من ديترويت ميشيغان.'

// create a canvas2d
var context = require('2d-context')({
  width: window.innerWidth,
  height: window.innerHeight
})

// setup font metrics
var metrics = createMetrics(context, fontStyle)

// some examples to see different modes and text
var slides = [ {
  text: lipsum, description: 'normal at 200px',
  width: 800,
  measure: metrics
}, {
  text: multiline, description: 'nowrap (newline only)',
  mode: 'nowrap',
  measure: metrics
}, {
  text: code, description: 'pre',
  mode: 'pre'
}, {
  text: code, description: 'pre clipped to 200px',
  mode: 'pre',
  width: window.innerWidth,
  measure: metrics
} ]

// This will wordwrap and draw the example "slide" 
function draw (context, opt) {
  var text = opt.text

  // wrap the text and get back a list of lines
  var lines = wrap.lines(text, opt)

  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  context.save()
  context.translate(20, 20)

  // now draw each line
  context.font = fontStyle
  context.fillStyle = 'white'
  var lineWidths = lines.map(function (line) {
    var str = text.substring(line.start, line.end)
    return context.measureText(str).width
  })

  var maxLineWidth = lineWidths.reduce(function (prev, b) {
    return Math.max(prev, b)
  }, 0)

  lines.forEach(function (line, i) {
    var str = text.substring(line.start, line.end)
    var lineWidth = lineWidths[i]
    context.fillText(str, (maxLineWidth - lineWidth), 10 + i * lineHeight)
  })

  context.restore()
}

function createMetrics (context, font) {
  context.font = font
  var charWidth = context.measureText('ن').width
  console.log('CHAR WIDTHa', charWidth)
  return function measure (text, start, end, width) {
    // measures the chunk of text, returning the substring
    // we can fit within the given width
    var availableGlyphs = Math.floor(width / charWidth)
    var totalGlyphs = Math.floor((end - start) * charWidth)
    var glyphs = Math.min((end - start), availableGlyphs, totalGlyphs)
    return {
      start: start,
      end: start + glyphs
    }
  }
}

// once the dom is ready, load up our app
document.body.appendChild(context.canvas)
document.body.style.background = 'black'
var index = 0

// start app
change(slides[index])

// cycle through modes
// setInterval(function() {
//     index++
//     change(slides[index % slides.length])
// }, 2500)

function change (slide) {
  draw(context, slide)
}
