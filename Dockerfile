#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["ProductiveTogether/ProductiveTogether.API.csproj", "ProductiveTogether/"]
COPY ["Contracts/Contracts.csproj", "Contracts/"]
COPY ["Entities/Entities.csproj", "Entities/"]
COPY ["Repository/Repository.csproj", "Repository/"]
RUN dotnet restore "ProductiveTogether/ProductiveTogether.API.csproj"
COPY . .
WORKDIR "/src/ProductiveTogether"
RUN dotnet build "ProductiveTogether.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ProductiveTogether.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProductiveTogether.API.dll"]
