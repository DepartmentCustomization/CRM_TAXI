Select 
pa.Id,
invoice_number,
part_name,
pa.part_price,
pa.create_date as arrival_date,
pa.part_quantity

from PartArrival pa
join Parts p on pa.part_id = p.Id
where category_id = @Id
and
 #filter_columns# 
order by pa.create_date desc
 
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only