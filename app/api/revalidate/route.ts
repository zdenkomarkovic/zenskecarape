import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Neispravan token." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { _type, slug } = body;

    switch (_type) {
      case "product":
        revalidatePath("/", "page");
        revalidatePath("/proizvodi", "page");
        if (slug?.current) {
          revalidatePath(`/proizvodi/${slug.current}`, "page");
        }
        revalidatePath("/kategorija/[slug]", "page");
        break;

      case "category":
        revalidatePath("/", "page");
        revalidatePath("/proizvodi", "page");
        if (slug?.current) {
          revalidatePath(`/kategorija/${slug.current}`, "page");
        }
        break;

      case "homepage":
        revalidatePath("/", "page");
        break;

      default:
        // color, size, denier, subcategory
        revalidatePath("/proizvodi", "page");
        revalidatePath("/kategorija/[slug]", "page");
        break;
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      slug: slug?.current ?? null,
    });
  } catch {
    return NextResponse.json(
      { message: "Greška pri revalidaciji." },
      { status: 500 }
    );
  }
}
