using Scalar.AspNetCore;
using SmartNotes.WebApi.Endpoints;

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    builder.Services.AddOpenApi();
    // Add CORS policy that allows everything
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll", policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    });

    var app = builder.Build();
    // Configure the HTTP request pipeline.
    if (builder.Configuration.GetValue<bool>("EnableApiDocumentation"))
    {
        app.MapOpenApi();
        app.MapScalarApiReference("api-docs", (options) =>
        {
            options
                .WithTitle("API Documentation")
                .WithModels(false)
                // .WithLayout(ScalarLayout.Classic)
                .WithTheme(ScalarTheme.Mars);
        });
    }

    app.UseHttpsRedirection();
    app.UseCors("AllowAll");
    app.MapWeatherForecastEndpoints();

    await app.RunAsync();
}
catch(Exception ex)
{
    Console.WriteLine(ex);
}