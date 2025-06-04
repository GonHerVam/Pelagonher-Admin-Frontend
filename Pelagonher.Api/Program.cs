using Pelagonher.Api.Data; // Importa tu DbContext
using Microsoft.EntityFrameworkCore; // Para los m�todos de extensi�n UseMySql o UseNpgsql

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// --- Configuraci�n de Swagger/OpenAPI ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Version = "v1", // Puedes cambiar la versi�n
        Title = "Pelagonher API", // El t�tulo que aparecer�
        Description = "Una API para gestionar los recursos de Pelagonher.", // Una descripci�n
        TermsOfService = new Uri("https://ejemplo.com/terminos"), // Opcional
        Contact = new Microsoft.OpenApi.Models.OpenApiContact // Informaci�n de contacto opcional
        {
            Name = "Soporte Pelagonher",
            Email = "soporte@pelagonher.com.ar",
            Url = new Uri("https://pelagonher.com.ar/contacto"),
        },
        License = new Microsoft.OpenApi.Models.OpenApiLicense // Licencia opcional
        {
            Name = "Licencia MIT",
            Url = new Uri("https://opensource.org/licenses/MIT"),
        }
    });
}); // <--- �Cierra aqu� la configuraci�n de SwaggerGen!

// --- Configuraci�n del DbContext ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Para MySQL:
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Para PostgreSQL (descomenta si usas PostgreSQL y comenta la de MySQL):
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//        options.UseNpgsql(connectionString));

// --- Fin de la configuraci�n del DbContext ---

// --- Construir la Aplicaci�n ---
var app = builder.Build();

// --- Configurar el HTTP request pipeline. ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// **A�ade estas dos l�neas para servir archivos est�ticos**
app.UseDefaultFiles(); // Permite que index.html sea la p�gina por defecto
app.UseStaticFiles();  // Habilita el servicio de archivos est�ticos desde wwwroot


app.UseAuthorization();

app.MapControllers();

app.Run(); // <--- Aqu� se mantiene la aplicaci�n escuchando