import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="py-24 px-8 max-w-4xl mx-auto text-center space-y-12">
          <h1 className="font-serif text-5xl lg:text-7xl">Our Story</h1>
          <p className="font-serif italic text-2xl text-foreground/70 leading-relaxed">
            CraftswomanAlley was born from a simple belief: the most beautiful things in the world are born from the human hand and the physical soul.
          </p>
          <div className="h-px w-20 bg-accent mx-auto"></div>
          <div className="font-sans text-lg text-foreground/70 leading-loose text-justify space-y-8 italic">
            <p>
              क्राफ्ट्सवुमन एली (CraftswomanAlley) सिर्फ एक स्टोर नहीं है, बल्कि यह उन टैलेंटेड महिला शिल्पकारों की एक कम्युनिटी है जो अपने हाथों के जादू से बेजान चीजों में जान डाल देती हैं। हमारी यह 'गली' उन कलाकृतियों का एक खास कलेक्शन है, जिसे किसी फैक्ट्री या मशीन ने नहीं, बल्कि रीयल इंडियन कारीगरी और मेहनत से बनाया गया है।
            </p>
            <p>
              हम 'Slow Craft' प्रोसेस में यकीन रखते हैं—जहाँ हर 'Fuzzy Wire' फ्लावर और 'Ancient Scroll' को तैयार करना एक आर्ट है। हम लिनन, हैंडमेड पेपर और सिल्क जैसे नेचुरल मैटेरियल्स का इस्तेमाल करते हैं ताकि आपकी यादें हमेशा के लिए ताज़ा रहें।
            </p>
            <p className="text-center font-serif not-italic text-xl text-neutral-900 border-t border-neutral-100 pt-8 uppercase tracking-widest text-sm">
              इस ब्यूटीफुल जर्नी में हमारे साथ जुड़ने और इन वुमन आर्टिस्ट्स को सपोर्ट करने के लिए आपका दिल से शुक्रिया।
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
