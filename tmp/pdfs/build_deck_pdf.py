from pathlib import Path

from reportlab.lib.utils import ImageReader
from reportlab.pdfgen.canvas import Canvas


ROOT = Path("/Users/sethlim/Documents/openai-interview-prep")
SOURCE = ROOT / "tmp/pdfs/qa"
OUTPUT = ROOT / "output/pdf/openai-doordash-loom-deck.pdf"

# A 16:9 landscape page. The source images are 1920 x 1080 and fill it exactly.
PAGE_WIDTH = 960
PAGE_HEIGHT = 540


def main() -> None:
    slides = sorted(SOURCE.glob("slide-[0-9][0-9].png"))
    if not slides:
        raise FileNotFoundError(f"No rendered slides found in {SOURCE}")
    missing = [str(slide) for slide in slides if not slide.exists()]
    if missing:
        raise FileNotFoundError(f"Missing rendered slides: {missing}")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = Canvas(str(OUTPUT), pagesize=(PAGE_WIDTH, PAGE_HEIGHT), pageCompression=1)
    pdf.setTitle("OpenAI x DoorDash - Sales Development Interview")
    pdf.setAuthor("Seth Lim")

    for slide in slides:
        pdf.drawImage(
            ImageReader(str(slide)),
            0,
            0,
            width=PAGE_WIDTH,
            height=PAGE_HEIGHT,
            preserveAspectRatio=False,
            mask="auto",
        )
        pdf.showPage()

    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    main()
