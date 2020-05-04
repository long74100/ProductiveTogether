using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.FilterModels
{
	public class PagedList<T> : List<T>
	{
		public int CurrentPage { get; private set; }
		public int TotalPages { get; private set; }
		public int PageSize { get; private set; }
		public int TotalCount { get; private set; }

		public bool HasPrevious => CurrentPage > 1;
		public bool HasNext => CurrentPage < TotalPages;

		public PagedList(List<T> items, int count, int page, int limit)
		{
			TotalCount = count;
			PageSize = limit;
			CurrentPage = page;
			TotalPages = (int)Math.Ceiling(count / (double)limit);

			AddRange(items);
		}

		public static async Task<PagedList<T>> ToPagedListAsync(IQueryable<T> source, int page, int limit)
		{
			var count = source.Count();
			var items = await source.Skip((page - 1) * limit).Take(limit).ToListAsync();

			return new PagedList<T>(items, count, page, limit);
		}
	}
}
