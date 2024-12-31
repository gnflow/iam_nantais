import { queryDatabase } from '@/db/lib/pgDb';
import { NextResponse } from 'next/server';
interface Context {
    params: Promise<{ id: string }>;
  }
  export async function GET(req: Request, props: Context) {
    console.log('props.params:', await props.params);

    try {
        const params = await props.params;
        const { id } = params;

        console.log(`api/user/user-details :: id:\n${id}`);

        // Validation initiale des paramètres
        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: 'Missing or invalid id' }, { status: 400 });
        }

        // Requête SQL pour récupérer les détails de l'utilisateur
        const query = `
          SELECT 
            first_name, last_name, birth_date, origin_place, address, phone, 
            business_name, business_type, business_id_type, business_address, business_email
          FROM user_details
          WHERE user_id = $1
        `;

        const userDetails = await queryDatabase(query, [id]);

        if (!userDetails || userDetails.length === 0) {
            return NextResponse.json({ error: 'User details not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, userDetails: userDetails[0] });
    } catch (error) {
        console.error('Error fetching user details:', error);

        // Gestion des erreurs SQL ou autres erreurs générales
        return NextResponse.json(
            { 
                error: 'Failed to fetch user details', 
                details: error instanceof Error ? error.message : String(error) 
            }, 
            { status: 500 }
        );
    }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {id} = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Vérification des données nécessaires
    const {
      first_name,
      last_name,
      birth_date,
      origin_place,
      address,
      phone,
      business_name,
      business_type,
      business_id_type,
      business_address,
      business_email,
    } = body;

    if (
      !first_name &&
      !last_name &&
      !birth_date &&
      !origin_place &&
      !address &&
      !phone &&
      !business_name &&
      !business_type &&
      !business_id_type &&
      !business_address &&
      !business_email
    ) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Requête SQL pour mettre à jour les détails de l'utilisateur
    const query = `
      UPDATE user_details
      SET 
        first_name = COALESCE($2, first_name), 
        last_name = COALESCE($3, last_name), 
        birth_date = COALESCE($4, birth_date), 
        origin_place = COALESCE($5, origin_place), 
        address = COALESCE($6, address), 
        phone = COALESCE($7, phone), 
        business_name = COALESCE($8, business_name), 
        business_type = COALESCE($9, business_type), 
        business_id_type = COALESCE($10, business_id_type), 
        business_address = COALESCE($11, business_address), 
        business_email = COALESCE($12, business_email), 
        updated_at = NOW()
      WHERE user_id = $1
    `;

    const result = await queryDatabase(query, [
      id,
      first_name,
      last_name,
      birth_date,
      origin_place,
      address,
      phone,
      business_name,
      business_type,
      business_id_type,
      business_address,
      business_email,
    ]);

    if (result[0] === 0) {
      return NextResponse.json({ error: 'Failed to update user details. User not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User details updated successfully' });
  } catch (error) {
    // Log détaillé de l'erreur
    console.error('Error updating user details:', error);

    // Vérification du type d'erreur et gestion en conséquence
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to update user details', details: error.message }, { status: 500 });
    }

    // Si l'erreur est d'un type inconnu, on renvoie une erreur générique
    return NextResponse.json({ error: 'Failed to update user details', details: String(error) }, { status: 500 });

   
  }
}
