import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / ".pdf-render-tools"))
import pymupdf
root = Path(__file__).resolve().parent.parent
document = pymupdf.open()
page = document.new_page(width=595, height=842)
page.draw_rect(page.rect, color=(.03,.035,.055), fill=(.03,.035,.055))
page.insert_text((48,90), "KB.", fontsize=34, color=(.72,.60,.94))
page.insert_text((48,165), "CV placeholder", fontsize=27, color=(.94,.94,.98))
page.insert_text((48,204), "Khair Bakhsh Noor Dad", fontsize=17, color=(.74,.73,.82))
page.insert_textbox(pymupdf.Rect(48,250,540,390), "This is a placeholder, not an approved CV.\n\nAn up-to-date CV is available on request:\nkhairbakshnoor@gmail.com\n\nTODO: Replace this file with the approved CV, then set\nportfolio.cv.available to true in src/data/portfolio.ts.", fontsize=12, color=(.74,.73,.82), lineheight=1.6)
document.save(root / "khair-portfolio/public/cv.pdf")
page.get_pixmap(matrix=pymupdf.Matrix(1,1)).save(root / ".tooling/cv-preview.png")
print("CV placeholder created and rendered.")
