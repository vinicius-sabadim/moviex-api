## MovieX Api

> API for the MovieX project.

### Seed

To start a database with data:

```
npm run seed
```

### Tasks

- Scrape by top movies on IMDB.

```
npm run scrape:top horror
```

- Scrape using saved movies information in a file.

```
npm run scrape:top file <genre>
```

for a file called `horror.txt`:

```
npm run scrape:top file horror
```
