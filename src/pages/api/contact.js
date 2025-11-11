export async function POST({ request }) {
  try {
    const data = await request.formData();
    
    // Extract form data
    const formData = {
      nome: data.get('nome'),
      email: data.get('email'),
      telefono: data.get('telefono'),
      fatturato: data.get('fatturato'),
      descrizione: data.get('descrizione'),
      privacy: data.get('privacy'),
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    };
    
    // Validation
    if (!formData.nome || !formData.email || !formData.telefono || !formData.fatturato) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Tutti i campi obbligatori devono essere compilati' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Formato email non valido' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Privacy acceptance check
    if (!formData.privacy) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'È necessario accettare la Privacy Policy' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // In production, here you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    // 4. Send autoresponse email
    
    console.log('New Patent Box consultation request:', formData);
    
    // For now, just log and return success
    // TODO: Implement actual email sending and data storage
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Richiesta inviata con successo! Ti contatteremo entro 24 ore.' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Form submission error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Errore interno del server. Riprova più tardi.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle GET requests (not allowed)
export async function GET() {
  return new Response(
    JSON.stringify({ 
      success: false, 
      message: 'Metodo non consentito' 
    }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}