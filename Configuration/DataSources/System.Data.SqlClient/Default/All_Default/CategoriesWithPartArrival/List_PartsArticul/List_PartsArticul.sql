Select 
Id,
articul,
part_name

from Parts
where category_id = @categoryId
and
 #filter_columns#
 #sort_columns#
 
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only